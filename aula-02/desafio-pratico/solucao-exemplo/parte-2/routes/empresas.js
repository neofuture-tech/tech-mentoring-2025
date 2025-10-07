const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const EMPRESAS_FILE = path.join(__dirname, "../data/empresas.json");

// Função para ler empresas
async function getEmpresas() {
  try {
    const data = await fs.readFile(EMPRESAS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Função para salvar empresas
async function saveEmpresas(empresas) {
  await fs.writeFile(EMPRESAS_FILE, JSON.stringify(empresas, null, 2));
}

// Listar todas as empresas
router.get("/", async (req, res) => {
  try {
    const empresas = await getEmpresas();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Criar nova empresa
router.post("/", async (req, res) => {
  try {
    const { nome, funcionarios } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({ error: "Nome da empresa é obrigatório" });
    }

    if (funcionarios === undefined || funcionarios < 0) {
      return res
        .status(400)
        .json({ error: "Quantidade de funcionários inválida" });
    }

    const empresas = await getEmpresas();

    const novaEmpresa = {
      id: Date.now().toString(),
      nome: nome.trim(),
      funcionarios: parseInt(funcionarios),
    };

    empresas.push(novaEmpresa);
    await saveEmpresas(empresas);

    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Atualizar empresa
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, funcionarios } = req.body;

    const empresas = await getEmpresas();
    const empresaIndex = empresas.findIndex((empresa) => empresa.id === id);

    if (empresaIndex === -1) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }

    if (nome !== undefined) {
      if (nome.trim() === "") {
        return res.status(400).json({ error: "Nome não pode ser vazio" });
      }
      empresas[empresaIndex].nome = nome.trim();
    }

    if (funcionarios !== undefined) {
      if (funcionarios < 0) {
        return res
          .status(400)
          .json({ error: "Quantidade de funcionários inválida" });
      }
      empresas[empresaIndex].funcionarios = parseInt(funcionarios);
    }

    await saveEmpresas(empresas);

    res.json(empresas[empresaIndex]);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Deletar empresa
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const empresas = await getEmpresas();
    const empresaIndex = empresas.findIndex((empresa) => empresa.id === id);

    if (empresaIndex === -1) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }

    empresas.splice(empresaIndex, 1);
    await saveEmpresas(empresas);

    res.json({ message: "Empresa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
