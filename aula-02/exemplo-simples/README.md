# Todo List Simples - Exemplo Prático

Este é um exemplo básico de uma aplicação todo-list fullstack usando HTML, CSS e JavaScript puro, sem autenticação.

## 🚀 Como Executar

### 1. Setup do Backend

```bash
# Navegar para a pasta do backend
cd backend

# Instalar dependências
npm install

# Iniciar o servidor
npm start
```

O servidor estará rodando em `http://localhost:3000`

### 2. Setup do Frontend

```bash
# Navegar para a pasta do frontend
cd frontend

# Abrir o arquivo index.html no navegador
# Ou usar um servidor local simples:
python -m http.server 8000
# Depois acessar: http://localhost:8000
```

## 📁 Estrutura do Projeto

```
exemplo-simples/
├── backend/
│   ├── package.json          # Dependências do Node.js
│   ├── server.js             # Servidor principal
│   ├── routes/
│   │   └── todos.js          # Rotas de tarefas
│   └── data/
│       └── todos.json        # Banco de dados de tarefas
└── frontend/
    ├── index.html            # Página principal
    ├── style.css             # Estilos
    └── script.js             # Lógica da aplicação
```

## 🔧 Funcionalidades

### Gerenciamento de Tarefas

- ✅ Criar nova tarefa
- ✅ Listar todas as tarefas
- ✅ Marcar como concluída/pendente
- ✅ Editar texto da tarefa
- ✅ Deletar tarefa

### Interface

- ✅ Design moderno e responsivo
- ✅ Feedback visual para todas as ações
- ✅ Validações básicas
- ✅ Mensagens de sucesso/erro

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **CORS** - Cross-Origin Resource Sharing

### Frontend

- **HTML5** - Estrutura
- **CSS3** - Estilos e responsividade
- **JavaScript ES6+** - Lógica da aplicação
- **Fetch API** - Comunicação com backend

## 📡 APIs Disponíveis

### Tarefas

#### GET `/api/todos`

Lista todas as tarefas.

**Response:**

```json
[
  {
    "id": "1234567890",
    "text": "Estudar JavaScript",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### POST `/api/todos`

Cria uma nova tarefa.

**Body:**

```json
{
  "text": "Nova tarefa"
}
```

**Response:**

```json
{
  "id": "1234567890",
  "text": "Nova tarefa",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### PUT `/api/todos/:id`

Atualiza uma tarefa existente.

**Body:**

```json
{
  "text": "Texto atualizado",
  "completed": true
}
```

#### DELETE `/api/todos/:id`

Deleta uma tarefa.

**Response:**

```json
{
  "message": "Tarefa deletada com sucesso"
}
```

## 🎨 Características do Design

- Interface limpa e moderna
- Gradiente de fundo atrativo
- Cards com sombras para profundidade
- Animações suaves
- Design responsivo para mobile
- Feedback visual para todas as ações
- Emojis para tornar a interface mais amigável

## 📚 Conceitos Demonstrados

### 1. **HTML (Estrutura)**

- Estrutura semântica da página
- Formulários e inputs
- Organização de elementos

### 2. **CSS (Estilo)**

- Layout flexbox
- Responsividade
- Animações e transições
- Gradientes e sombras

### 3. **JavaScript (Interatividade)**

- Manipulação do DOM
- Event listeners
- Fetch API para requisições
- Gerenciamento de estado local
- Validação de dados

### 4. **Backend (Servidor)**

- Servidor Express
- Rotas REST
- Manipulação de arquivos JSON
- Tratamento de erros

### 5. **Comunicação Frontend/Backend**

- Requisições HTTP
- Formato JSON
- CORS para comunicação entre domínios
- Tratamento de respostas

## 🐛 Solução de Problemas

### Backend não inicia

- Verifique se o Node.js está instalado
- Execute `npm install` na pasta backend
- Verifique se a porta 3000 está disponível

### Frontend não conecta com backend

- Verifique se o backend está rodando
- Confirme se a URL da API está correta
- Verifique o console do navegador para erros CORS

### Erro de CORS

- O CORS está configurado no backend
- Certifique-se de que o frontend está sendo servido por um servidor (não abra o arquivo diretamente)

## 🎯 Objetivos de Aprendizado

1. **Entender HTML, CSS e JavaScript**

   - Como cada tecnologia contribui para a aplicação
   - Separação de responsabilidades

2. **Compreender conceitos de servidor**

   - O que é um servidor web
   - Como funciona a comunicação cliente/servidor

3. **Trabalhar com APIs REST**

   - Métodos HTTP (GET, POST, PUT, DELETE)
   - Formato JSON
   - Endpoints e rotas

4. **Praticar desenvolvimento fullstack**
   - Integração frontend/backend
   - Gerenciamento de estado
   - Tratamento de erros

## 🚀 Próximos Passos

Para expandir este projeto, você pode:

1. **Adicionar mais funcionalidades:**

   - Filtros de tarefas (todas, pendentes, concluídas)
   - Busca de tarefas
   - Categorias de tarefas
   - Data de vencimento

2. **Melhorar a persistência:**

   - Migrar para um banco de dados real
   - Implementar backup automático

3. **Adicionar recursos avançados:**

   - Drag and drop para reordenar
   - Modo escuro
   - Notificações
   - Sincronização em tempo real

4. **Melhorar a experiência:**
   - Loading states
   - Animações mais elaboradas
   - Temas personalizáveis
   - Atalhos de teclado
