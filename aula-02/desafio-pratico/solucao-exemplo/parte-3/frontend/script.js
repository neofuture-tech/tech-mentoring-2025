// Configurações da API
const API_BASE_URL = '/api';
let editingId = null;

// Elementos do DOM
const elements = {
    form: document.getElementById('empresaForm'),
    nomeInput: document.getElementById('nomeEmpresa'),
    funcionariosInput: document.getElementById('funcionarios'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    tableContainer: document.getElementById('tableContainer'),
    empresasTableBody: document.getElementById('empresasTableBody'),
    emptyState: document.getElementById('emptyState'),
    totalCount: document.getElementById('totalCount'),
    apiStatus: document.getElementById('apiStatus'),
    statusIndicator: document.getElementById('statusIndicator'),
    statusText: document.getElementById('statusText'),
    confirmModal: document.getElementById('confirmModal'),
    empresaNome: document.getElementById('empresaNome'),
    cancelDelete: document.getElementById('cancelDelete'),
    confirmDelete: document.getElementById('confirmDelete'),
    toastContainer: document.getElementById('toastContainer')
};

// Estado da aplicação
let empresas = [];
let empresaParaDeletar = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    elements.form.addEventListener('submit', handleFormSubmit);
    elements.cancelBtn.addEventListener('click', cancelEdit);
    elements.refreshBtn.addEventListener('click', carregarEmpresas);
    elements.cancelDelete.addEventListener('click', closeConfirmModal);
    elements.confirmDelete.addEventListener('click', executeDelete);
    
    // Fechar modal clicando fora
    elements.confirmModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmModal) {
            closeConfirmModal();
        }
    });
}

// Inicializar aplicação
async function initializeApp() {
    await verificarStatusAPI();
    await carregarEmpresas();
    
    // Atualizar status a cada 30 segundos
    setInterval(verificarStatusAPI, 30000);
}

// Verificar status da API
async function verificarStatusAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/empresas`);
        
        if (response.ok) {
            elements.statusIndicator.textContent = '✅';
            elements.statusText.textContent = 'API Online';
            elements.apiStatus.style.backgroundColor = '#f0f9ff';
            elements.apiStatus.style.borderLeft = '4px solid #10b981';
        } else {
            throw new Error('API com problemas');
        }
    } catch (error) {
        elements.statusIndicator.textContent = '❌';
        elements.statusText.textContent = 'API Offline';
        elements.apiStatus.style.backgroundColor = '#fef2f2';
        elements.apiStatus.style.borderLeft = '4px solid #ef4444';
    }
}

// Carregar empresas da API
async function carregarEmpresas() {
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE_URL}/empresas`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        empresas = result.data || result;
        
        renderEmpresas();
        hideLoading();
        
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
        showError('Erro ao carregar empresas. Verifique se a API está funcionando.');
    }
}
// Renderizar tabela de empresas
function renderEmpresas() {
    if (!empresas || empresas.length === 0) {
        showEmptyState();
        return;
    }
    
    elements.empresasTableBody.innerHTML = '';
    
    empresas.forEach(empresa => {
        const row = createEmpresaRow(empresa);
        elements.empresasTableBody.appendChild(row);
    });
    
    elements.totalCount.textContent = `Total: ${empresas.length}`;
    showTable();
}

// Criar linha da tabela
function createEmpresaRow(empresa) {
    const row = document.createElement('tr');
    row.dataset.id = empresa.id;
    
    if (editingId === empresa.id) {
        row.classList.add('editing');
        row.innerHTML = `
            <td>${empresa.id}</td>
            <td>
                <input type="text" class="edit-input" id="editNome" value="${empresa.nome}" required>
            </td>
            <td>
                <input type="number" class="edit-input" id="editFuncionarios" value="${empresa.funcionarios}" min="0" required>
            </td>
            <td class="table-actions-cell">
                <button class="btn btn-success btn-small" onclick="saveEdit('${empresa.id}')">
                    💾 Salvar
                </button>
                <button class="btn btn-secondary btn-small" onclick="cancelEdit()">
                    ❌ Cancelar
                </button>
            </td>
        `;
    } else {
        row.innerHTML = `
            <td>${empresa.id}</td>
            <td>${empresa.nome}</td>
            <td>${empresa.funcionarios.toLocaleString('pt-BR')}</td>
            <td class="table-actions-cell">
                <button class="btn btn-primary btn-small" onclick="startEdit('${empresa.id}')">
                    ✏️ Editar
                </button>
                <button class="btn btn-danger btn-small" onclick="confirmDeleteEmpresa('${empresa.id}', '${empresa.nome}')">
                    🗑️ Excluir
                </button>
            </td>
        `;
    }
    
    return row;
}

// Manipular envio do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const nome = elements.nomeInput.value.trim();
    const funcionarios = parseInt(elements.funcionariosInput.value);
    
    if (!nome) {
        showToast('Nome da empresa é obrigatório', 'error');
        return;
    }
    
    if (isNaN(funcionarios) || funcionarios < 0) {
        showToast('Quantidade de funcionários deve ser um número válido', 'error');
        return;
    }
    
    const isEditing = editingId !== null;
    
    try {
        setButtonLoading(true);
        
        if (isEditing) {
            await updateEmpresa(editingId, { nome, funcionarios });
        } else {
            await createEmpresa({ nome, funcionarios });
        }
        
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        showToast('Erro ao salvar empresa', 'error');
    } finally {
        setButtonLoading(false);
    }
}

// Criar nova empresa
async function createEmpresa(dadosEmpresa) {
    const response = await fetch(`${API_BASE_URL}/empresas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEmpresa)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar empresa');
    }
    
    showToast('Empresa criada com sucesso!', 'success');
    resetForm();
    await carregarEmpresas();
}

// Atualizar empresa
async function updateEmpresa(id, dadosEmpresa) {
    const response = await fetch(`${API_BASE_URL}/empresas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEmpresa)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar empresa');
    }
    
    showToast('Empresa atualizada com sucesso!', 'success');
    resetForm();
    await carregarEmpresas();
}
// Iniciar edição
function startEdit(id) {
    editingId = id;
    
    const empresa = empresas.find(emp => emp.id === id);
    if (empresa) {
        elements.nomeInput.value = empresa.nome;
        elements.funcionariosInput.value = empresa.funcionarios;
        
        elements.submitBtn.querySelector('.btn-text').textContent = 'Atualizar Empresa';
        elements.cancelBtn.style.display = 'inline-flex';
        
        // Scroll para o formulário
        elements.form.scrollIntoView({ behavior: 'smooth' });
    }
    
    renderEmpresas();
}

// Salvar edição inline
async function saveEdit(id) {
    const nomeInput = document.getElementById('editNome');
    const funcionariosInput = document.getElementById('editFuncionarios');
    
    const nome = nomeInput.value.trim();
    const funcionarios = parseInt(funcionariosInput.value);
    
    if (!nome) {
        showToast('Nome da empresa é obrigatório', 'error');
        nomeInput.focus();
        return;
    }
    
    if (isNaN(funcionarios) || funcionarios < 0) {
        showToast('Quantidade de funcionários deve ser um número válido', 'error');
        funcionariosInput.focus();
        return;
    }
    
    try {
        await updateEmpresa(id, { nome, funcionarios });
        editingId = null;
    } catch (error) {
        console.error('Erro ao salvar edição:', error);
        showToast('Erro ao salvar alterações', 'error');
    }
}

// Cancelar edição
function cancelEdit() {
    editingId = null;
    resetForm();
    renderEmpresas();
}

// Confirmar exclusão
function confirmDeleteEmpresa(id, nome) {
    empresaParaDeletar = id;
    elements.empresaNome.textContent = nome;
    elements.confirmModal.style.display = 'flex';
}

// Fechar modal de confirmação
function closeConfirmModal() {
    elements.confirmModal.style.display = 'none';
    empresaParaDeletar = null;
}

// Executar exclusão
async function executeDelete() {
    if (!empresaParaDeletar) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/empresas/${empresaParaDeletar}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao excluir empresa');
        }
        
        showToast('Empresa excluída com sucesso!', 'success');
        await carregarEmpresas();
        
    } catch (error) {
        console.error('Erro ao excluir empresa:', error);
        showToast('Erro ao excluir empresa', 'error');
    } finally {
        closeConfirmModal();
    }
}

// Resetar formulário
function resetForm() {
    elements.form.reset();
    editingId = null;
    elements.submitBtn.querySelector('.btn-text').textContent = 'Adicionar Empresa';
    elements.cancelBtn.style.display = 'none';
}

// Controlar loading do botão
function setButtonLoading(loading) {
    const btnText = elements.submitBtn.querySelector('.btn-text');
    const btnLoading = elements.submitBtn.querySelector('.btn-loading');
    
    if (loading) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        elements.submitBtn.disabled = true;
    } else {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        elements.submitBtn.disabled = false;
    }
}

// Mostrar loading
function showLoading() {
    elements.loading.style.display = 'flex';
    elements.errorMessage.style.display = 'none';
    elements.tableContainer.style.display = 'none';
    elements.emptyState.style.display = 'none';
}

// Esconder loading
function hideLoading() {
    elements.loading.style.display = 'none';
}

// Mostrar erro
function showError(message) {
    elements.errorText.textContent = message;
    elements.loading.style.display = 'none';
    elements.errorMessage.style.display = 'block';
    elements.tableContainer.style.display = 'none';
    elements.emptyState.style.display = 'none';
}

// Mostrar tabela
function showTable() {
    elements.loading.style.display = 'none';
    elements.errorMessage.style.display = 'none';
    elements.tableContainer.style.display = 'block';
    elements.emptyState.style.display = 'none';
}

// Mostrar estado vazio
function showEmptyState() {
    elements.loading.style.display = 'none';
    elements.errorMessage.style.display = 'none';
    elements.tableContainer.style.display = 'none';
    elements.emptyState.style.display = 'block';
    elements.totalCount.textContent = 'Total: 0';
}

// Mostrar toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️';
    
    toast.innerHTML = `
        <span style="font-size: 1.2rem;">${icon}</span>
        <span>${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Remover após 4 segundos
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Funções globais (chamadas pelos botões HTML)
window.startEdit = startEdit;
window.saveEdit = saveEdit;
window.cancelEdit = cancelEdit;
window.confirmDeleteEmpresa = confirmDeleteEmpresa;
window.carregarEmpresas = carregarEmpresas;

// Funções globais para uso nos event listeners inline
window.toggleEdit = toggleEdit;
window.deleteEmpresa = deleteEmpresa;
