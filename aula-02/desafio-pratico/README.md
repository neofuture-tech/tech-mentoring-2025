# 💻 Desafio Prático - Aula 02

## Objetivo

Construir uma aplicação fullstack para gerenciar empresas e seus funcionários, passando por 3 partes progressivas.

---

## Parte 1: Frontend Estático

### Objetivo

Construir uma página HTML que liste empresas e a quantidade de funcionários, estilizada com CSS.

### Requisitos

1. **Criar arquivo HTML** (`index.html`):

   - Título da página: "Gerenciador de Empresas"
   - Tabela com colunas: Nome da Empresa, Quantidade de Funcionários
   - Pelo menos 5 empresas na lista

2. **Adicionar CSS** (`style.css`):
   - Estilizar a tabela (bordas, cores, espaçamento)
   - Design responsivo
   - Cores e fontes agradáveis

### Estrutura Sugerida

```
parte-1/
├── index.html
└── style.css
```

### Exemplo de Dados

```
- Tech Solutions - 150 funcionários
- Digital Innovations - 87 funcionários
- Cloud Systems - 230 funcionários
- Web Dynamics - 45 funcionários
- Software House - 120 funcionários
```

### 📺 Vídeos Recomendados

- [HTML e CSS ](https://www.youtube.com/watch?v=hu-q2zYwEYs&list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G)
- [CSS Grid e Flexbox - Design Responsivo](https://www.youtube.com/watch?v=wsTv9y931o8)

---

## Parte 2: Backend (API REST)

### Objetivo

Criar uma API em Node.js que permita listar, criar, editar e deletar empresas.

### Requisitos

1. **Configurar servidor Express**:

   - Porta 3000
   - Middleware CORS
   - Middleware para JSON

2. **Endpoints obrigatórios**:

   - `GET /api/empresas` - Listar todas as empresas
   - `POST /api/empresas` - Criar nova empresa
   - `PUT /api/empresas/:id` - Editar empresa
   - `DELETE /api/empresas/:id` - Deletar empresa

3. **Modelo de dados** (empresa):

   ```json
   {
     "id": "1",
     "nome": "Tech Solutions",
     "funcionarios": 150
   }
   ```

4. **Persistência**:
   - Arquivo JSON (`empresas.json`)

### Estrutura Sugerida

```
parte-2/
├── package.json
├── server.js
├── routes/
│   └── empresas.js
└── data/
    └── empresas.json
```

### 📺 Vídeos Recomendados

- [What is a REST API?](https://www.youtube.com/watch?v=lsMQRaeKNDk)

- [Node.js - Crash Course](https://www.youtube.com/watch?v=32M1al-Y6Ag)

---

## Parte 3: Integração Frontend + Backend

### Objetivo

Conectar o frontend com a API desenvolvida, permitindo operações CRUD pela interface.

### Requisitos

1. **Listar empresas**:

   - Consumir endpoint `GET /api/empresas`
   - Exibir em tabela dinâmica

2. **Criar empresa**:

   - Formulário com nome e quantidade de funcionários
   - Enviar para `POST /api/empresas`
   - Atualizar lista após criação

3. **Editar empresa**:

   - Botão "Editar" em cada linha
   - Modo de edição inline ou modal
   - Enviar para `PUT /api/empresas/:id`

4. **Deletar empresa**:
   - Botão "Deletar" em cada linha
   - Confirmação antes de deletar
   - Enviar para `DELETE /api/empresas/:id`

### Estrutura Sugerida

```
parte-3/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── empresas.js
│   └── data/
│       └── empresas.json
└── frontend/
    ├── index.html
    ├── style.css
    └── script.js
```

### 📺 Vídeos Recomendados

- [Fetch API - Como fazer requisições HTTP em JavaScript](https://www.youtube.com/watch?v=cuEtnrL9-H0)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

---

## Entrega

### O que enviar:

1. Código completo das 3 partes
2. README com instruções de execução ([Ver README-EXECUCAO.md](./README-EXECUCAO.md))
3. Screenshots da aplicação funcionando

### Como organizar:

```
aula-02/
└── desafio-pratico/
    ├── README.md (este arquivo)
    ├── parte-1/
    │   ├── index.html
    │   └── style.css
    ├── parte-2/
    │   ├── backend completo
    └── parte-3/
        ├── backend/
        └── frontend/
```

---

## Critérios de Avaliação

### Parte 1 (20 pontos)

- HTML bem estruturado (5 pontos)
- CSS aplicado corretamente (10 pontos)
- Responsividade (5 pontos)

### Parte 2 (35 pontos)

- Todos os endpoints funcionando (20 pontos)
- Validação de dados (5 pontos)
- Tratamento de erros (5 pontos)
- Código organizado (5 pontos)

### Parte 3 (45 pontos)

- Listagem funcionando (10 pontos)
- Criação funcionando (10 pontos)
- Edição funcionando (10 pontos)
- Deleção funcionando (10 pontos)
- Interface intuitiva (5 pontos)

---

## Dicas

### Para a Parte 1:

- Use `<table>` para exibir os dados
- Aplique `:hover` nas linhas da tabela
- Use Flexbox ou Grid para layout responsivo

### Para a Parte 2:

- Teste os endpoints com Postman antes de integrar
- Use `fs.promises` para operações assíncronas com arquivos
- Valide os dados de entrada

### Para a Parte 3:

- Use `fetch()` para fazer requisições
- Implemente feedback visual (loading, sucesso, erro)
- Atualize a lista dinamicamente após cada operação

---

## Recursos Úteis

- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [Express.js Documentation](https://expressjs.com/)
- [MDN - Tables](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table)
- [CSS Tricks - Table Styling](https://css-tricks.com/complete-guide-table-element/)

---

## Prazo

**Entrega**: Próxima aula (Semana 3)
**Formato**: Link do repositório GitHub
