#  Desafio Prático - Aplicação Fullstack de Gerenciador de Empresas

Este projeto é uma aplicação fullstack completa para gerenciar uma lista de empresas, desenvolvida como parte de um desafio prático. A aplicação permite Criar, Ler, Atualizar e Deletar (CRUD) empresas através de uma interface web que se comunica com uma API RESTful.

O projeto foi construído em três partes progressivas.

##  Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Fetch API, DOM Manipulation.
* **Backend:** Node.js, Express.js, CORS.
* **Persistência:** Arquivo JSON (`empresas.json`).
* **Ferramentas:** VS Code, Live Server, Nodemon, Postman.

---

### Parte 1: Frontend Estático

* **Objetivo:** Criar uma página HTML estática e estilizada com CSS para exibir uma lista de empresas.
* **Localização:** `parte-1/`
* **Como Executar:**
    1.  Abra a pasta `parte-1/` no VS Code.
    2.  Clique com o botão direito no `index.html`.
    3.  Selecione "Open with Live Server".

```
parte-1/
├── index.html
└── style.css
```

---


### Parte 2: Backend (API REST)

* **Objetivo:** Criar uma API RESTful em Node.js e Express para gerenciar os dados das empresas, salvando-os em um arquivo JSON.
* **Localização:** `parte-2/` (Esta é a versão de desenvolvimento da API).
* **Endpoints da API (CRUD):**
    * `GET /api/empresas`: Lista todas as empresas.
    * `POST /api/empresas`: Cria uma nova empresa.
    * `PUT /api/empresas/:id`: Atualiza uma empresa existente.
    * `DELETE /api/empresas/:id`: Deleta uma empresa.

```
parte-2/
├── package.json
├── server.js
├── routes/
│   └── empresas.js
└── data/
    └── empresas.json
```

---


### Parte 3: Integração Fullstack

* **Objetivo:** Conectar o frontend da Parte 1 com a API da Parte 2, criando uma aplicação dinâmica. O frontend agora usa JavaScript (`fetch`) para consumir os 4 endpoints da API.
* **Localização:** `parte-3/`
* Esta é a **versão final e funcional** da aplicação.

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

Para rodar a aplicação fullstack da `parte-3`, você precisa iniciar **dois servidores** simultaneamente.

### 1. Iniciar o Servidor Backend (API)

O backend fornece os dados.

1.  Abra um terminal.
2.  Navegue até a pasta do backend:
    ```bash
    cd parte-3/backend
    ```
3.  Instale as dependências (só precisa fazer isso uma vez):
    ```bash
    npm install
    ```
4.  Inicie o servidor (ele usará o `nodemon` para reiniciar automaticamente):
    ```bash
    npm run dev
    ```
5.  O terminal deve exibir: `Servidor rodando na porta http://localhost:3000`.
6.  **Deixe este terminal rodando.**

### 2. Iniciar o Servidor Frontend (Interface Web)

O frontend mostra a página e "conversa" com o backend.

1.  Abra o projeto no VS Code.
2.  No explorador de arquivos, navegue até `parte-3/frontend/`.
3.  Clique com o **botão direito** no arquivo `index.html`.
4.  Selecione a opção **"Open with Live Server"**.

Seu navegador abrirá automaticamente (em um endereço como `http://127.0.0.1:5500`)