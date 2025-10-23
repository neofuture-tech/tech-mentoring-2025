const express = require("express");
const cors = require("cors");
const path = require("path");
const empresasRoutes = require("./routes/empresas");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use("/api/empresas", empresasRoutes);


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});


app.use(express.static(path.join(__dirname, "../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
