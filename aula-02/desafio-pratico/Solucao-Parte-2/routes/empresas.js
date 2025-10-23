const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/empresas.json");


async function lerEmpresas() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

async function salvarEmpresas(empresas) {
  await fs.writeFile(filePath, JSON.stringify(empresas, null, 2));
}


router.get("/", async (req, res) => {
  try {
    const empresas = await lerEmpresas();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler empresas." });
  }
});


router.post("/", async (req, res) => {
  try {
    const { nome, funcionarios } = req.body;
    if (!nome || !funcionarios) {
      return res.status(400).json({ error: "Nome e número de funcionários são obrigatórios." });
    }

    const empresas = await lerEmpresas();
    const novaEmpresa = {
      id: (empresas.length + 1).toString(),
      nome,
      funcionarios,
    };

    empresas.push(novaEmpresa);
    await salvarEmpresas(empresas);
    res.status(201).json(novaEmpresa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar empresa." });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, funcionarios } = req.body;

    const empresas = await lerEmpresas();
    const index = empresas.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    empresas[index] = { id, nome, funcionarios };
    await salvarEmpresas(empresas);
    res.json(empresas[index]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar empresa." });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const empresas = await lerEmpresas();

    const novasEmpresas = empresas.filter((e) => e.id !== id);
    await salvarEmpresas(novasEmpresas);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar empresa." });
  }
});

module.exports = router;
