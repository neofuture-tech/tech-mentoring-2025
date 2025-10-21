const API_URL = 'http://localhost:3000/api/empresas';

// Elementos do DOM
const companiesTableBody = document.getElementById('companiesTableBody');
const companyNameInput = document.getElementById('companyNameInput');
const employeesInput = document.getElementById('employeesInput');
const addCompanyBtn = document.getElementById('addCompanyBtn');

let editingCompanyId = null;

// Função para buscar e renderizar as empresas
async function fetchAndRenderCompanies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const empresas = await response.json();
        
        companiesTableBody.innerHTML = '';

        empresas.forEach(empresa => {
            const row = companiesTableBody.insertRow();
            row.setAttribute('data-id', empresa.id);

            const nameCell = row.insertCell();
            const employeesCell = row.insertCell();
            const actionsCell = row.insertCell();

            nameCell.textContent = empresa.nome;
            employeesCell.textContent = empresa.funcionarios;

            actionsCell.innerHTML = `
                <button class="btn btn-edit" onclick="startEditCompany('${empresa.id}')">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-delete" onclick="deleteCompany('${empresa.id}')">
                    <i class="fas fa-trash-alt"></i> Deletar
                </button>
            `;
        });
    } catch (error) {
        console.error('Erro ao buscar empresas:', error);
        alert('Falha ao carregar a lista de empresas. Verifique o servidor.');
    }
}

// Função para adicionar uma nova empresa
async function addCompany() {
    const nome = companyNameInput.value.trim();
    const funcionarios = parseInt(employeesInput.value.trim());

    if (!nome || isNaN(funcionarios) || funcionarios <= 0) {
        alert('Por favor, preencha o nome da empresa e a quantidade de funcionários (um número positivo).');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, funcionarios }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }

        // Limpa o formulário
        companyNameInput.value = '';
        employeesInput.value = '';
        
        // Atualiza a lista de empresas
        await fetchAndRenderCompanies();
        
        alert('Empresa adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar empresa:', error);
        alert(`Falha ao adicionar a empresa: ${error.message}`);
    }
}

// Função para iniciar a edição inline
function startEditCompany(id) {
    if (editingCompanyId) {
        cancelEditCompany(editingCompanyId);
    }
    
    editingCompanyId = id;
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (!row) return;

    const nameCell = row.cells[0];
    const employeesCell = row.cells[1];
    const actionsCell = row.cells[2];

    const currentName = nameCell.textContent;
    const currentEmployees = employeesCell.textContent;

    // Substitui o texto por inputs
    nameCell.innerHTML = `<input type="text" value="${currentName}" id="editName-${id}">`;
    employeesCell.innerHTML = `<input type="number" value="${currentEmployees}" id="editEmployees-${id}">`;

    // Altera os botões de ação
    actionsCell.innerHTML = `
        <button class="btn btn-save" onclick="saveCompany('${id}')">
            <i class="fas fa-save"></i> Salvar
        </button>
        <button class="btn btn-cancel" onclick="cancelEditCompany('${id}')">
            <i class="fas fa-times"></i> Cancelar
        </button>
    `;
}

// Função para salvar a empresa editada
async function saveCompany(id) {
    const nameInput = document.getElementById(`editName-${id}`);
    const employeesInput = document.getElementById(`editEmployees-${id}`);

    const newName = nameInput.value.trim();
    const newEmployees = parseInt(employeesInput.value.trim());

    if (!newName || isNaN(newEmployees) || newEmployees <= 0) {
        alert('Por favor, preencha o nome e a quantidade de funcionários (um número positivo).');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: newName, funcionarios: newEmployees }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }

        editingCompanyId = null;
        await fetchAndRenderCompanies();
        alert('Empresa atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        alert(`Falha ao atualizar a empresa: ${error.message}`);
    }
}

// Função para cancelar a edição
function cancelEditCompany(id) {
    editingCompanyId = null;
    fetchAndRenderCompanies();
}

// Função para deletar uma empresa
async function deleteCompany(id) {
    if (!confirm('Tem certeza que deseja deletar esta empresa? Esta ação é irreversível.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.status === 204 || response.ok) {
            await fetchAndRenderCompanies();
            alert('Empresa deletada com sucesso!');
        } else {
            const errorData = await response.json();
            throw new Error(errorData.erro || `HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao deletar empresa:', error);
        alert(`Falha ao deletar a empresa: ${error.message}`);
    }
}

// Event Listeners
addCompanyBtn.addEventListener('click', addCompany);

// Permitir adicionar empresa pressionando Enter
companyNameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addCompany();
    }
});

employeesInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addCompany();
    }
});

// Inicializar: carregar a lista de empresas quando a página carregar
document.addEventListener('DOMContentLoaded', fetchAndRenderCompanies);