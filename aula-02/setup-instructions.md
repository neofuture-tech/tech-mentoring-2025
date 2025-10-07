# 🚀 Instruções de Setup - Aula 02

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **NPM** (vem com o Node.js)
- **Git** (para versionamento)
- **Editor de código** (VS Code recomendado)
- **Navegador web** (Chrome, Firefox, Safari)

## 📋 Checklist de Setup

### 1. Verificar Instalações

```bash
# Verificar Node.js
node --version

# Verificar NPM
npm --version

# Verificar Git
git --version
```

### 2. Configurar Projeto

```bash
# Clonar ou criar o projeto
mkdir tech-mentoring-2025
cd tech-mentoring-2025

# Criar estrutura de pastas
mkdir aula-02
cd aula-02
mkdir exemplo-todo-list
cd exemplo-todo-list
mkdir backend frontend
```

### 3. Setup do Backend

```bash
# Navegar para backend
cd backend

# Inicializar projeto Node.js
npm init -y

# Instalar dependências
npm install express cors

# Instalar dependência de desenvolvimento
npm install --save-dev nodemon

# Criar estrutura de pastas
mkdir routes data
```

### 4. Setup do Frontend

```bash
# Navegar para frontend
cd ../frontend

# Criar arquivos básicos
touch index.html style.css script.js auth.js
```

### 5. Configurar Scripts

No `package.json` do backend, adicione:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente (Opcional)

Para maior segurança, crie um arquivo `.env` no backend:

```bash
# backend/.env
JWT_SECRET=sua_chave_secreta_super_segura_aqui
PORT=3000
```

E instale o pacote dotenv:

```bash
npm install dotenv
```

### Configuração do VS Code

Crie um arquivo `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## 🚀 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar backend em modo desenvolvimento
npm run dev

# Iniciar backend em produção
npm start

# Ver logs em tempo real
npm run dev | tee logs.txt
```

### Testes

```bash
# Testar API com curl
curl -X GET http://localhost:3000/api/test

# Testar criação de tarefa
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text":"Minha primeira tarefa"}'
```

## 🐛 Solução de Problemas Comuns

### Erro: "Cannot find module"

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"

```bash
# Encontrar processo usando a porta
lsof -ti:3000

# Matar processo
kill -9 $(lsof -ti:3000)
```

### Erro: "CORS policy"

- Verifique se o CORS está configurado no backend
- Confirme se o frontend está acessando a URL correta

### Erro: "Cannot read property"

- Verifique se os dados estão sendo enviados corretamente
- Confirme se o JSON está sendo parseado adequadamente

## 📚 Recursos de Aprendizado

### Documentação Oficial

- [Node.js](https://nodejs.org/docs/)
- [Express.js](https://expressjs.com/)
- [MDN HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [MDN CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [MDN JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### Ferramentas Úteis

- [Postman](https://www.postman.com/) - Testar APIs
- [JSON Formatter](https://jsonformatter.curiousconcept.com/) - Formatar JSON
- [Color Picker](https://htmlcolorcodes.com/) - Escolher cores

### Extensões VS Code Recomendadas

- Live Server
- Prettier - Code formatter
- REST Client
- HTML CSS Support
- JavaScript (ES6) code snippets

## 🎯 Próximos Passos

1. **Implementar o exemplo básico**
2. **Testar todas as funcionalidades**
3. **Personalizar o design**
4. **Adicionar novas features**
5. **Preparar apresentação**

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do console
2. Consulte a documentação
3. Teste com ferramentas como Postman
4. Peça ajuda no grupo da turma

## ✅ Checklist Final

- [ ] Node.js instalado e funcionando
- [ ] Projeto criado com estrutura correta
- [ ] Dependências instaladas
- [ ] Backend rodando na porta 3000
- [ ] Frontend acessível no navegador
- [ ] CRUD de tarefas funcionando
- [ ] Design responsivo
- [ ] Tratamento de erros implementado
- [ ] APIs documentadas
- [ ] README completo
