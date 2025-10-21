const express = require('express');
const cors = require('cors');
const empresasRoutes = require('./routes/empresas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/empresas', empresasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${PORT}`);
});