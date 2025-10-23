const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/empresas.json");


async function lerEmpresas() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    if (err.code === "ENOENT") return []; 
    throw err;
  }
}


async function salvarEmpresas(empresas) {
  await fs.writeFile(filePath, JSON.stringify(empresas, null, 2));
}


function validarEmpresaInput(body, isUpdate = false) {
  const erros = [];
  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const funcionariosNum = Number(body.funcionarios);

  if (!isUpdate || body.nome !== undefined) {
    if (!nome) erros.push("Nome é obrigatório.");
  }
  if (!isUpdate || body.funcionarios !== undefined) {
    if (!Number.isFinite(funcionariosNum) || funcionariosNum < 0) {
      erros.push("Funcionários deve ser um número >= 0.");
    }
  }
  return { erros, nome, funcionarios: funcionariosNum };
}


router.get("/", async (_req, res) => {
  try {
    const empresas = await lerEmpresas();
    res.json(empresas);
  } catch {
    res.status(500).json({ error: "Erro ao ler empresas." });
  }
});


router.post("/", async (req, res) => {
  const { erros, nome, funcionarios } = validarEmpresaInput(req.body);
  if (erros.length) return res.status(400).json({ error: erros.join(" ") });

  try {
    const empresas = await lerEmpresas();
    const nextId = (empresas.reduce((max, e) => Math.max(max, Number(e.id) || 0), 0) + 1).toString();
    const novaEmpresa = { id: nextId, nome, funcionarios };
    empresas.push(novaEmpresa);
    await salvarEmpresas(empresas);
    res.status(201).json(novaEmpresa);
  } catch {
    res.status(500).json({ error: "Erro ao criar empresa." });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { erros, nome, funcionarios } = validarEmpresaInput(req.body, true);
  if (erros.length) return res.status(400).json({ error: erros.join(" ") });

  try {
    const empresas = await lerEmpresas();
    const index = empresas.findIndex((e) => e.id === id);
    if (index === -1) return res.status(404).json({ error: "Empresa não encontrada." });

    const atual = empresas[index];
    empresas[index] = {
      id,
      nome: req.body.nome === undefined ? atual.nome : nome,
      funcionarios: req.body.funcionarios === undefined ? atual.funcionarios : funcionarios,
    };

    await salvarEmpresas(empresas);
    res.json(empresas[index]);
  } catch {
    res.status(500).json({ error: "Erro ao editar empresa." });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const empresas = await lerEmpresas();
    const sizeBefore = empresas.length;
    const novas = empresas.filter((e) => e.id !== id);
    if (novas.length === sizeBefore) return res.status(404).json({ error: "Empresa não encontrada." });
    await salvarEmpresas(novas);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao deletar empresa." });
  }
});

module.exports = router;
