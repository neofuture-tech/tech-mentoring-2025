const express = require("express");
const cors = require("cors");
const empresasRoutes = require("./routes/empresas");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/empresas", empresasRoutes);

// Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ message: "API funcionando!" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
