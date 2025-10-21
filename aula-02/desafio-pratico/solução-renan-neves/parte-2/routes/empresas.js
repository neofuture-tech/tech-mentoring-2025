const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '..', 'data', 'empresas.json');

async function lerEmpresas() {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

async function salvarEmpresas(empresas) {
  await fs.writeFile(dbPath, JSON.stringify(empresas, null, 2));
}

router.get('/', async (req, res) => {
  try {
    const empresas = await lerEmpresas();
    res.json(empresas);
  } catch (err) {
    res.status(500).json({ erro: 'Falha ao ler o arquivo.' });
  }
});

router.post('/', async (req, res) => {
  const { nome, funcionarios } = req.body;

  if (!nome || funcionarios == null) {
    return res.status(400).json({ erro: 'Nome e funcionários são obrigatórios.' });
  }

  try {
    const empresas = await lerEmpresas();
    const novaEmpresa = {
      id: Date.now().toString(), 
      nome,
      funcionarios
    };
    empresas.push(novaEmpresa);
    await salvarEmpresas(empresas);
    res.status(201).json(novaEmpresa);
  } catch (err) {
    res.status(500).json({ erro: 'Falha ao salvar a empresa.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, funcionarios } = req.body;

  try {
    const empresas = await lerEmpresas();
    const index = empresas.findIndex(e => e.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: 'Empresa não encontrada.' });
    }

    if (nome) empresas[index].nome = nome;
    if (funcionarios != null) empresas[index].funcionarios = funcionarios;

    await salvarEmpresas(empresas);
    res.json(empresas[index]);
  } catch (err) {
    res.status(500).json({ erro: 'Falha ao atualizar a empresa.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const empresas = await lerEmpresas();
    const novaLista = empresas.filter(e => e.id !== id);

    if (novaLista.length === empresas.length) {
      return res.status(404).json({ erro: 'Empresa não encontrada.' });
    }

    await salvarEmpresas(novaLista);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ erro: 'Falha ao deletar a empresa.' });
  }
});

module.exports = router;