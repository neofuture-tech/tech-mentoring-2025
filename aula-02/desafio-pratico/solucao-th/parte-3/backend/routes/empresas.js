const express = require('express');                                     
const router = express.Router();                                        // mini servidor do express
const fs = require('fs').promises;                                      // file system, para lidar com pastas
const path = require('path');                                           // caminho de pastas
const crypto = require('crypto');                                       // para criar uns ids aleatórios

const dataPath = path.join(__dirname, '..', 'data', 'empresas.json');   // construímos o caminho para o nosso "banco de dados" json

const readData = async () => {                                          // função para ler os dados do arquivo (assíncrona pra ser mais rápida)
    try {
        const data = await fs.readFile(dataPath, 'utf8');               // await significa para ler até terminar 
        return JSON.parse(data);                                        // transforma num arrray utilizável
    } catch (error) {
        // se o arquivo não existir ou der erro, retornamos um array vazio
        return [];
    }
};

const writeData = async (data) => {                                     // função para escrever os dados no arquivo
    // usamos JSON.stringify com 'null, 2' para formatar o JSON (é um truque)
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf8');
};


// ENDPOINT 1: GET /api/empresas - Listar todas as empresas
router.get('/', async (req, res) => {                                   // coloca a / e define o get do router como
    try {                                                               // tenta ler os dados e o retorna num status 200 e o json das empresas
        const empresas = await readData();
        res.status(200).json(empresas);
    } catch (error) {                                                   //caso contrário retorna o json de erro
        res.status(500).json({ message: 'Erro ao ler os dados das empresas.' });
    }
});

// ENDPOINT 2: POST /api/empresas - Criar nova empresa
router.post('/', async (req, res) => {
    try {
        const { nome, funcionarios } = req.body;                        // pega o objeto que o express preparou e o separa

        if (!nome || !funcionarios) {                                   // verifica se o nome e a quantidade de funcionarios existem
            return res.status(400).json({ message: 'Nome e funcionários são obrigatórios.' });
        }

        const empresas = await readData();                              // se passou, lê os dados
        
        const novaEmpresa = {
            id: crypto.randomUUID(),                                    // gera um novo ID(completamente diferente dos 5 já add)
            nome: nome,
            funcionarios: parseInt(funcionarios)                        // garante que funcionários seja um número
        };

        empresas.push(novaEmpresa);                                     // coloca no json de empresas
        await writeData(empresas);                                      // sobreescrevemos um novo json com a empresa a ser add
        
        res.status(201).json(novaEmpresa);                              // retorna 201 (created) e o objeto da nova empresa
    } catch (error) {                                                   
        res.status(500).json({ message: 'Erro ao criar nova empresa.' });
    }
});

// ENDPOINT 3: PUT /api/empresas/:id - Editar empresa
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;                                      // pega o ID da URL
        const { nome, funcionarios } = req.body;                        // pega os novos dados da empresa

        if (!nome || !funcionarios) {
            return res.status(400).json({ message: 'Nome e funcionários são obrigatórios.' });
        }

        const empresas = await readData();
        
        
        const index = empresas.findIndex(emp => emp.id === id);         // encontra o índice da empresa que queremos editar

        if (index === -1) {                                             // se não encontrar (index === -1), retorna erro 404
            return res.status(404).json({ message: 'Empresa não encontrada.' });
        }

        empresas[index] = {                                             // atualiza os dados da empresa
            ...empresas[index],                                         // mantém o ID 
            nome: nome,
            funcionarios: parseInt(funcionarios)
        };

        await writeData(empresas);                                      //sobescreve
        
        res.status(200).json(empresas[index]);                          // retorna a empresa atualizada
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar empresa.' });
    }
});

// ENDPOINT 4: DELETE /api/empresas/:id - Deletar empresa
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;                                      // Pega o ID da URL
        const empresas = await readData();

        const novasEmpresas = empresas.filter(emp => emp.id !== id);    // filtra o array, mantendo apenas as empresas com ID diferente

        if (empresas.length === novasEmpresas.length) {                 // se o tamanho do array não mudou, é porque o ID não foi encontrado
            return res.status(404).json({ message: 'Empresa não encontrada.' });
        }

        await writeData(novasEmpresas);
        
        // retorna 204 (No Content), que é padrão para DELETE bem-sucedido
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar empresa.' });
    }
});


// no final, exportamos o router para o server.js poder usá-lo
module.exports = router;