// Configuração da API
const API_BASE_URL = "http://localhost:3000/api";

// Elementos do DOM
const empresaForm = document.getElementById("empresa-form");
const nomeInput = document.getElementById("nome");
const funcionariosInput = document.getElementById("funcionarios");
const empresasTbody = document.getElementById("empresas-tbody");
const messageDiv = document.getElementById("message");

// Estado da aplicação
let empresas = [];
let editingId = null;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  loadEmpresas();
});

function setupEventListeners() {
  empresaForm.addEventListener("submit", handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const funcionarios = parseInt(funcionariosInput.value);

  if (!nome || funcionarios < 0) {
    showMessage("Preencha todos os campos corretamente", "error");
    return;
  }

  if (editingId) {
    await updateEmpresa(editingId, nome, funcionarios);
  } else {
    await createEmpresa(nome, funcionarios);
  }
}

async function loadEmpresas() {
  try {
    const response = await fetch(`${API_BASE_URL}/empresas`);
    const data = await response.json();

    if (response.ok) {
      empresas = data;
      renderEmpresas();
    } else {
      showMessage("Erro ao carregar empresas", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function renderEmpresas() {
  empresasTbody.innerHTML = "";

  if (empresas.length === 0) {
    empresasTbody.innerHTML = `
      <tr>
        <td colspan="3" class="no-empresas">
          Nenhuma empresa cadastrada. Adicione uma nova empresa acima.
        </td>
      </tr>
    `;
    return;
  }

  empresas.forEach((empresa) => {
    const row = createEmpresaRow(empresa);
    empresasTbody.appendChild(row);
  });
}

function createEmpresaRow(empresa) {
  const tr = document.createElement("tr");
  tr.className = "empresa-row";
  tr.dataset.id = empresa.id;

  tr.innerHTML = `
    <td>
      <span class="empresa-nome">${escapeHtml(empresa.nome)}</span>
      <input type="text" class="edit-input" value="${escapeHtml(
        empresa.nome
      )}" />
    </td>
    <td>
      <span class="empresa-funcionarios">${empresa.funcionarios}</span>
      <input type="number" class="edit-input" value="${
        empresa.funcionarios
      }" min="0" />
    </td>
    <td class="actions">
      <button class="btn-edit" onclick="toggleEdit('${empresa.id}')">
        Editar
      </button>
      <button class="btn-delete" onclick="deleteEmpresa('${empresa.id}')">
        Deletar
      </button>
    </td>
  `;

  return tr;
}

async function createEmpresa(nome, funcionarios) {
  try {
    const response = await fetch(`${API_BASE_URL}/empresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, funcionarios }),
    });

    const data = await response.json();

    if (response.ok) {
      empresas.push(data);
      renderEmpresas();
      empresaForm.reset();
      showMessage("Empresa adicionada com sucesso! ✅", "success");
    } else {
      showMessage(data.error || "Erro ao adicionar empresa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function toggleEdit(id) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  const isEditing = row.classList.contains("editing");

  if (isEditing) {
    // Salvar edição
    const nomeInput = row.querySelector('input[type="text"]');
    const funcionariosInput = row.querySelector('input[type="number"]');

    const nome = nomeInput.value.trim();
    const funcionarios = parseInt(funcionariosInput.value);

    if (!nome || funcionarios < 0) {
      showMessage("Dados inválidos", "error");
      return;
    }

    updateEmpresa(id, nome, funcionarios);
  } else {
    // Entrar em modo de edição
    row.classList.add("editing");
    const editBtn = row.querySelector(".btn-edit");
    editBtn.textContent = "Salvar";
    editBtn.classList.remove("btn-edit");
    editBtn.classList.add("btn-save");
  }
}

async function updateEmpresa(id, nome, funcionarios) {
  try {
    const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, funcionarios }),
    });

    const data = await response.json();

    if (response.ok) {
      const empresaIndex = empresas.findIndex((e) => e.id === id);
      empresas[empresaIndex] = data;
      renderEmpresas();
      showMessage("Empresa atualizada com sucesso! ✅", "success");
    } else {
      showMessage(data.error || "Erro ao atualizar empresa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

async function deleteEmpresa(id) {
  if (!confirm("Tem certeza que deseja deletar esta empresa?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      empresas = empresas.filter((e) => e.id !== id);
      renderEmpresas();
      showMessage("Empresa deletada com sucesso! 🗑️", "success");
    } else {
      showMessage(data.error || "Erro ao deletar empresa", "error");
    }
  } catch (error) {
    showMessage("Erro de conexão com o servidor", "error");
  }
}

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type} show`;

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
window.deleteEmpresa = deleteEmpresa;
