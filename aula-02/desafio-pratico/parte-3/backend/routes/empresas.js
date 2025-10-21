const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const dbPath = path.join(__dirname, '..', 'data', 'empresas.json');

// Função para ler empresas do arquivo JSON
async function lerEmpresas() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler arquivo de empresas:', error);
        // Se o arquivo não existir, retorna array vazio
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// Função para salvar empresas no arquivo JSON
async function salvarEmpresas(empresas) {
    try {
        // Garantir que o diretório existe
        const dir = path.dirname(dbPath);
        await fs.mkdir(dir, { recursive: true });
        
        await fs.writeFile(dbPath, JSON.stringify(empresas, null, 2), 'utf-8');
    } catch (error) {
        console.error('Erro ao salvar arquivo de empresas:', error);
        throw error;
    }
}

// Função para validar dados da empresa
function validarEmpresa(nome, funcionarios) {
    const erros = [];

    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
        erros.push('Nome da empresa é obrigatório e deve ser um texto válido');
    }

    if (funcionarios === undefined || funcionarios === null) {
        erros.push('Quantidade de funcionários é obrigatória');
    } else if (typeof funcionarios !== 'number' || funcionarios < 0 || !Number.isInteger(funcionarios)) {
        erros.push('Quantidade de funcionários deve ser um número inteiro não negativo');
    }

    return erros;
}

// GET /api/empresas - Listar todas as empresas
router.get('/', async (req, res) => {
    try {
        const empresas = await lerEmpresas();
        console.log(`📋 Listando ${empresas.length} empresas`);
        res.json(empresas);
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        res.status(500).json({ 
            erro: 'Falha ao ler o arquivo de empresas',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET /api/empresas/:id - Buscar empresa por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const empresas = await lerEmpresas();
        const empresa = empresas.find(e => e.id === id);

        if (!empresa) {
            return res.status(404).json({ erro: 'Empresa não encontrada' });
        }

        console.log(`🔍 Empresa encontrada: ${empresa.nome}`);
        res.json(empresa);
    } catch (error) {
        console.error('Erro ao buscar empresa:', error);
        res.status(500).json({ 
            erro: 'Falha ao buscar a empresa',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// POST /api/empresas - Criar nova empresa
router.post('/', async (req, res) => {
    try {
        const { nome, funcionarios } = req.body;

        // Validar dados
        const erros = validarEmpresa(nome, funcionarios);
        if (erros.length > 0) {
            return res.status(400).json({ 
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }

        const empresas = await lerEmpresas();
        
        // Verificar se já existe empresa com o mesmo nome
        const empresaExistente = empresas.find(e => 
            e.nome.toLowerCase().trim() === nome.toLowerCase().trim()
        );
        
        if (empresaExistente) {
            return res.status(409).json({ 
                erro: 'Já existe uma empresa com este nome'
            });
        }

        // Criar nova empresa
        const novaEmpresa = {
            id: Date.now().toString(),
            nome: nome.trim(),
            funcionarios: Number(funcionarios),
            criadoEm: new Date().toISOString()
        };

        empresas.push(novaEmpresa);
        await salvarEmpresas(empresas);

        console.log(`✅ Nova empresa criada: ${novaEmpresa.nome} (${novaEmpresa.funcionarios} funcionários)`);
        res.status(201).json(novaEmpresa);
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
        res.status(500).json({ 
            erro: 'Falha ao salvar a empresa',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// PUT /api/empresas/:id - Atualizar empresa
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, funcionarios } = req.body;

        // Validar dados
        const erros = validarEmpresa(nome, funcionarios);
        if (erros.length > 0) {
            return res.status(400).json({ 
                erro: 'Dados inválidos',
                detalhes: erros
            });
        }

        const empresas = await lerEmpresas();
        const index = empresas.findIndex(e => e.id === id);

        if (index === -1) {
            return res.status(404).json({ erro: 'Empresa não encontrada' });
        }

        // Verificar se já existe outra empresa com o mesmo nome
        const empresaExistente = empresas.find(e => 
            e.id !== id && e.nome.toLowerCase().trim() === nome.toLowerCase().trim()
        );
        
        if (empresaExistente) {
            return res.status(409).json({ 
                erro: 'Já existe outra empresa com este nome'
            });
        }

        // Atualizar empresa
        const empresaAnterior = { ...empresas[index] };
        empresas[index] = {
            ...empresas[index],
            nome: nome.trim(),
            funcionarios: Number(funcionarios),
            atualizadoEm: new Date().toISOString()
        };

        await salvarEmpresas(empresas);

        console.log(`📝 Empresa atualizada: ${empresaAnterior.nome} → ${empresas[index].nome}`);
        res.json(empresas[index]);
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        res.status(500).json({ 
            erro: 'Falha ao atualizar a empresa',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// DELETE /api/empresas/:id - Deletar empresa
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const empresas = await lerEmpresas();
        const empresaParaDeletar = empresas.find(e => e.id === id);

        if (!empresaParaDeletar) {
            return res.status(404).json({ erro: 'Empresa não encontrada' });
        }

        const novaLista = empresas.filter(e => e.id !== id);
        await salvarEmpresas(novaLista);

        console.log(`🗑️ Empresa deletada: ${empresaParaDeletar.nome}`);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar empresa:', error);
        res.status(500).json({ 
            erro: 'Falha ao deletar a empresa',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;