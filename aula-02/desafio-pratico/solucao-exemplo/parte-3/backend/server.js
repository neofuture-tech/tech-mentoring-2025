const express = require("express");
const cors = require("cors");
const path = require("path");

// Tentar importar rotas com tratamento de erro
let empresasRoutes;
try {
  empresasRoutes = require("./routes/empresas");
  console.log('✅ Arquivo de rotas importado com sucesso');
} catch (error) {
  console.error('❌ Erro ao importar rotas:', error.message);
  process.exit(1);
}

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8080', 'http://localhost:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]  "${req.method} ${req.url}" "${req.get('User-Agent')}"`);
  next();
});

// Middleware para capturar respostas
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(...args) {
    if (res.statusCode >= 400) {
      console.log(`[${new Date().toISOString()}]  "${req.method} ${req.url}" Error (${res.statusCode}): "${res.statusMessage}"`);
    }
    return originalSend.apply(this, args);
  };
  next();
});

// Rotas da API
console.log('🔄 Registrando rotas /api/empresas...');
app.use("/api/empresas", empresasRoutes);
console.log('✅ Rotas /api/empresas registradas com sucesso');

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "API funcionando!",
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /api/empresas - Listar empresas',
      'POST /api/empresas - Criar empresa', 
      'PUT /api/empresas/:id - Editar empresa',
      'DELETE /api/empresas/:id - Deletar empresa'
    ]
  });
});

// Rota para servir o frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Middleware para rotas não encontradas da API (deve ser o ÚLTIMO)
app.use('/api/*', (req, res) => {
  console.log(`❌ Rota API não encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} não encontrado`,
    availableRoutes: [
      'GET /api/test',
      'GET /api/empresas',
      'POST /api/empresas',
      'PUT /api/empresas/:id',
      'DELETE /api/empresas/:id'
    ]
  });
});

// Tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro na aplicação:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log('📊 GERENCIADOR DE EMPRESAS - PARTE 3');
  console.log('🚀 ========================================');
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Frontend: http://localhost:${PORT}`);
  console.log(`🧪 API Test: http://localhost:${PORT}/api/test`);
  console.log(`📋 Empresas: http://localhost:${PORT}/api/empresas`);
  console.log('🚀 ========================================');
  
  // Verificar rotas registradas
  console.log('🛣️  Rotas registradas:');
  app._router.stack.forEach((layer, index) => {
    if (layer.route) {
      console.log(`   ${index + 1}. ${Object.keys(layer.route.methods).join(', ').toUpperCase()} ${layer.route.path}`);
    } else if (layer.name === 'router') {
      console.log(`   ${index + 1}. Router middleware: ${layer.regexp}`);
    }
  });
  console.log('🚀 ========================================');
});
