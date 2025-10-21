const express = require('express');
const cors = require('cors');
const path = require('path');
const empresasRoutes = require('./routes/empresas');

const app = express();

// Middlewares
app.use(cors({
    origin: '*', // Em produção, especifique o domínio do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para log das requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rotas da API
app.use('/api/empresas', empresasRoutes);

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.json({ 
        message: 'API do Gerenciador de Empresas está funcionando!',
        version: '1.0.0',
        endpoints: {
            'GET /api/empresas': 'Listar todas as empresas',
            'POST /api/empresas': 'Criar nova empresa',
            'PUT /api/empresas/:id': 'Atualizar empresa',
            'DELETE /api/empresas/:id': 'Deletar empresa'
        }
    });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({ 
        erro: 'Rota não encontrada',
        path: req.originalUrl 
    });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({ 
        erro: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado!'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 API disponível em: http://localhost:${PORT}`);
    console.log(`📋 Documentação em: http://localhost:${PORT}/`);
});

module.exports = app;