// Configuração da API
const API_BASE_URL = "http://localhost:3000/api";

// Elementos do DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todosContainer = document.getElementById("todos-container");
const messageDiv = document.getElementById("message");

// Estado da aplicação
let todos = [];

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadTodos();
});

function setupEventListeners() {
  // Formulário para nova tarefa
  todoForm.addEventListener("submit", handleAddTodo);
}

async function handleAddTodo(e) {
  e.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (response.ok) {
      todos.push(data);
      renderTodos();
      todoInput.value = "";
      showMessage("Tarefa adicionada com sucesso! ✅", "success");
    } else {
      showMessage(data.error || "Erro ao adicionar tarefa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

async function loadTodos() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    const data = await response.json();

    if (response.ok) {
      todos = data;
      renderTodos();
    } else {
      showMessage("Erro ao carregar tarefas", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function renderTodos() {
  todosContainer.innerHTML = "";

  if (todos.length === 0) {
    todosContainer.innerHTML = `
      <div class="no-todos">
        <h3>🎉 Nenhuma tarefa encontrada!</h3>
        <p>Adicione uma nova tarefa para começar a organizar seu dia.</p>
      </div>
    `;
    return;
  }

  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todosContainer.appendChild(todoElement);
  });
}

function createTodoElement(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.className = `todo-item ${todo.completed ? "completed" : ""}`;
  todoDiv.dataset.id = todo.id;

  todoDiv.innerHTML = `
    <input type="checkbox" class="todo-checkbox" ${
      todo.completed ? "checked" : ""
    }>
    <span class="todo-text">${escapeHtml(todo.text)}</span>
    <input type="text" class="todo-edit" value="${escapeHtml(todo.text)}">
    <div class="todo-actions">
      <button class="edit-btn" onclick="toggleEdit('${todo.id}')">
        ${
          todo.text ===
          document.querySelector(`[data-id="${todo.id}"] .todo-edit`)?.value
            ? "Salvar"
            : "Editar"
        }
      </button>
      <button class="delete-btn" onclick="deleteTodo('${
        todo.id
      }')">Deletar</button>
    </div>
  `;

  // Event listener para checkbox
  const checkbox = todoDiv.querySelector(".todo-checkbox");
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  // Event listener para edição
  const editInput = todoDiv.querySelector(".todo-edit");
  editInput.addEventListener("blur", () => saveEdit(todo.id));
  editInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveEdit(todo.id);
    }
  });

  return todoDiv;
}

async function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const data = await response.json();

    if (response.ok) {
      todo.completed = data.completed;
      renderTodos();
      showMessage(
        todo.completed ? "Tarefa concluída! 🎉" : "Tarefa reaberta",
        "success"
      );
    } else {
      showMessage(data.error || "Erro ao atualizar tarefa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function toggleEdit(id) {
  const todoElement = document.querySelector(`[data-id="${id}"]`);
  const textElement = todoElement.querySelector(".todo-text");
  const editInput = todoElement.querySelector(".todo-edit");
  const editBtn = todoElement.querySelector(".edit-btn");

  if (editInput.classList.contains("active")) {
    // Salvar edição
    saveEdit(id);
  } else {
    // Entrar no modo de edição
    textElement.classList.add("hidden");
    editInput.classList.add("active");
    editInput.focus();
    editInput.select();
    editBtn.textContent = "Salvar";
  }
}

async function saveEdit(id) {
  const todoElement = document.querySelector(`[data-id="${id}"]`);
  const editInput = todoElement.querySelector(".todo-edit");
  const newText = editInput.value.trim();

  if (!newText) {
    renderTodos(); // Cancelar edição
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    });

    const data = await response.json();

    if (response.ok) {
      const todo = todos.find((t) => t.id === id);
      todo.text = data.text;
      renderTodos();
      showMessage("Tarefa atualizada com sucesso! ✏️", "success");
    } else {
      showMessage(data.error || "Erro ao atualizar tarefa", "error");
      renderTodos(); // Cancelar edição
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
    renderTodos(); // Cancelar edição
  }
}

async function deleteTodo(id) {
  if (!confirm("Tem certeza que deseja deletar esta tarefa?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      todos = todos.filter((t) => t.id !== id);
      renderTodos();
      showMessage("Tarefa deletada com sucesso! 🗑️", "success");
    } else {
      showMessage(data.error || "Erro ao deletar tarefa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type} show`;

  // Limpar mensagem após 3 segundos
  setTimeout(() => {
    clearMessage();
  }, 3000);
}

function clearMessage() {
  messageDiv.textContent = "";
  messageDiv.className = "message";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Funções globais para uso nos event listeners inline
window.toggleEdit = toggleEdit;
window.deleteTodo = deleteTodo;
