const express = require('express');                                     // importando do node_modules (express é um framework popular para node que abstrai a complexidade de criar um servidor HTTP)
const cors = require('cors');                                           // cors permite a ligação do front com o back

const empresasRoutes = require('./routes/empresas');                    // importa a "API" criada 

const app = express();                                                  // executamos a função express na constante app(nosso servidor)

const PORT = 3000;                                                      // a porta do servidor

app.use(cors());                                                        // usando o cors como plugin para facilitar pro front
app.use(express.json());                                                // converte requisições para json

app.use('/api/empresas', empresasRoutes);                               // diz ao app para que todas as rotas definidas dentro da variável empresasRoutes ficarem sobre o prefixo definido

app.listen(PORT, () => {                                                // liga o servidor na porta definida antes e printa no terminal a confirmação
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});