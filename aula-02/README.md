# Aula 02 - Introdução ao Desenvolvimento Web

## 📚 Conteúdo da Aula

### 1. Fundamentos do Desenvolvimento Web

#### **HTML (HyperText Markup Language)**

- **O que é**: Linguagem de marcação para estruturar conteúdo web
- **Responsabilidades**:
  - Estrutura da página (títulos, parágrafos, listas)
  - Formulários e inputs
  - Links e navegação
  - Semântica e acessibilidade

#### **CSS (Cascading Style Sheets)**

- **O que é**: Linguagem para estilizar e formatar páginas web
- **Responsabilidades**:
  - Aparência visual (cores, fontes, layout)
  - Responsividade (adaptação a diferentes telas)
  - Animações e transições
  - Organização visual

#### **JavaScript**

- **O que é**: Linguagem de programação para interatividade
- **Responsabilidades**:
  - Manipulação do DOM
  - Validação de formulários
  - Comunicação com servidores
  - Lógica da aplicação

### 2. Servidores e Web APIs

#### **O que é um Servidor?**

- **Definição**: Computador que fornece serviços para outros computadores (clientes)
- **Tipos**:
  - **Servidor Web**: Serve páginas HTML, CSS, JS
  - **Servidor de API**: Fornece dados via APIs REST
  - **Servidor de Banco de Dados**: Armazena e gerencia dados

#### **Web APIs (Application Programming Interface)**

- **O que é**: Conjunto de regras que permite comunicação entre aplicações
- **Características**:
  - **REST**: Arquitetura baseada em HTTP
  - **Endpoints**: URLs específicas para cada funcionalidade
  - **Métodos HTTP**: GET, POST, PUT, DELETE
  - **Formato de dados**: JSON (JavaScript Object Notation)

#### **Fluxo de Comunicação**

1. **Cliente** (navegador) faz requisição
2. **Servidor** processa a requisição
3. **Servidor** retorna resposta (dados ou página)
4. **Cliente** exibe o resultado

### 3. Frontend vs Backend

#### **Frontend (Cliente)**

- **Onde roda**: No navegador do usuário
- **Tecnologias**: HTML, CSS, JavaScript
- **Responsabilidades**:
  - Interface do usuário
  - Interação com o usuário
  - Validação de formulários
  - Requisições para o backend

#### **Backend (Servidor)**

- **Onde roda**: Em um servidor remoto
- **Tecnologias**: Node.js, Python, PHP, etc.
- **Responsabilidades**:
  - Lógica de negócio
  - Banco de dados
  - APIs e endpoints
  - Processamento de dados

---

## 🎯 Desafios da Aula

### **Desafio Teórico**

Responda às questões teóricas sobre HTML, CSS, DOM, Servidores, HTTP, APIs REST, JSON e Autenticação.

📁 **Localização**: `desafio-teorico/README.md`

---

### **Desafio Prático**

Construa uma aplicação fullstack de gerenciamento de empresas em 3 partes progressivas.

#### **Parte 1: Frontend Estático**

- HTML com tabela de empresas
- CSS para estilização

#### **Parte 2: Backend (API REST)**

- API em Node.js com Express
- CRUD completo de empresas
- Persistência em JSON

#### **Parte 3: Integração**

- Conectar frontend com backend
- Listar, criar, editar e deletar empresas pela interface

📁 **Localização**: `desafio-pratico/README.md`

---

## 📂 Estrutura do Repositório

```
aula-02/
├── README.md                          # Este arquivo
├── desafio-teorico/
│   └── README.md                      # Questões teóricas
├── desafio-pratico/
│   ├── README.md                      # Instruções do desafio
│   └── solucao-exemplo/               # Exemplo de solução
│       ├── parte-1/                   # Frontend estático
│       ├── parte-2/                   # Backend API
│       └── parte-3/                   # Integração completa
├── exemplo-simples/                   # Todo-list simples (material de apoio)
│   ├── backend/
│   └── frontend/
└── setup-instructions.md              # Instruções de configuração
```

---

## 🚀 Como Começar

### 1. Desafio Teórico

1. Acesse `desafio-teorico/README.md`
2. Responda às questões diretamente no arquivo
3. Faça commit e envie seu repositório

### 2. Desafio Prático

#### Setup Inicial

```bash
# Clonar ou criar repositório
git clone seu-repositorio
cd aula-02/desafio-pratico

# Criar estrutura de pastas
mkdir -p parte-1 parte-2 parte-3
```

#### Parte 1 - Frontend Estático

```bash
cd parte-1
# Criar index.html e style.css
# Implementar tabela de empresas
```

#### Parte 2 - Backend

```bash
cd parte-2
npm init -y
npm install express cors
# Implementar API REST
```

#### Parte 3 - Integração

```bash
cd parte-3
# Copiar backend da parte-2
# Criar frontend interativo
# Integrar com a API
```

---

## 📝 Entregáveis

1. **Desafio Teórico**:

   - Arquivo README.md com respostas

2. **Desafio Prático**:
   - Código completo das 3 partes
   - README com instruções de execução
   - Screenshots da aplicação funcionando

---

## 🎓 Objetivos de Aprendizado

- Entender HTML, CSS e JavaScript
- Compreender conceitos de servidor e API
- Praticar comunicação frontend/backend
- Trabalhar com APIs REST
- Manipular dados JSON
- Implementar CRUD completo
- Validação básica de dados

---

## 📚 Recursos Adicionais

- [MDN Web Docs - HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Express.js Documentation](https://expressjs.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [JSON.org](https://www.json.org/json-pt.html)

---

## 📅 Prazo

**Entrega**: Próxima aula (Semana 3)
**Formato**: Link do repositório GitHub com ambos os desafios completos
