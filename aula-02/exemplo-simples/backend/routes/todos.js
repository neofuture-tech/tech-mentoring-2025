const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();
const TODOS_FILE = path.join(__dirname, "../data/todos.json");

// Função para ler todos
async function getTodos() {
  try {
    const data = await fs.readFile(TODOS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Função para salvar todos
async function saveTodos(todos) {
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// Listar todas as tarefas
router.get("/", async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Criar nova tarefa
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Texto da tarefa é obrigatório" });
    }

    const todos = await getTodos();

    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    await saveTodos(todos);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Atualizar tarefa
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todos = await getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    if (text !== undefined) {
      todos[todoIndex].text = text.trim();
    }

    if (completed !== undefined) {
      todos[todoIndex].completed = completed;
    }

    await saveTodos(todos);

    res.json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Deletar tarefa
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todos = await getTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    todos.splice(todoIndex, 1);
    await saveTodos(todos);

    res.json({ message: "Tarefa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
