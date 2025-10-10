const tableBody = document.querySelector(".container table tbody");
const modalCreateEnterprise = document.querySelector(".create-enterprise");

var currentOpenedModal = null;

/**
 * @param { 'POST' | 'GET' | 'PUT' | 'DELETE' } method
 * @param { object | undefined } [body=undefined]
 */
async function api(method, body = undefined) {
    const options = {
        method,
        body: body ? JSON.stringify(body) : "",
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (!["POST", "PUT"].includes(method)) delete options.body;

    const result = await fetch("http://localhost:3000/api/empresas", options);
    const data = await result.json();

    return {
        status: result.status,
        data,
    };
}

// ======== TABLE METHODS ========

/**
 * @param {string} nome
 * @param {number} funcionarios
 */
function createRow(nome, funcionarios) {
    const tableRow = document.createElement("tr");
    const nomeTableData = document.createElement("td");
    const funcionariosTableData = document.createElement("td");

    nomeTableData.innerText = nome;
    funcionariosTableData.innerText = funcionarios;

    tableRow.appendChild(nomeTableData);
    tableRow.appendChild(funcionariosTableData);

    return tableRow;
}

function createLoadingRow() {
    const row = createRow("", "");
    row.classList.add("loading-row");
    tableBody.appendChild(row);
}

async function loadTableRows() {
    tableBody.dataset.loading = true;
    createLoadingRow();
    const empresaList = (await api("GET")).data;

    tableBody.innerHTML = "";
    if (empresaList) {
        empresaList.forEach((empresa) => {
            tableBody.appendChild(
                createRow(empresa.nome, empresa.funcionarios)
            );
        });
    }
    tableBody.dataset.loading = false;
}

// ======== MODAL METHODS ========

/**
 * @param {PointerEvent} event
 */
function closeModal(event) {
    if (currentOpenedModal) {
        clearModalErrors(currentOpenedModal);
        clearModalInputs(currentOpenedModal);
        return currentOpenedModal.removeAttribute("data-opened");
    }

    event.target.parentNode.removeAttribute("data-opened");
}

/**
 * @param {HTMLElement} target
 */
function openModal(target) {
    currentOpenedModal = target;
    target.setAttribute("data-opened", "");
}

function showNewEnterprise() {
    openModal(modalCreateEnterprise);
}

/**
 * @param {HTMLElement} modal
 */
function clearModalInputs(modal) {
    modal.querySelectorAll("input").forEach((input) => (input.value = ""));
}

function clearModalErrors(modal) {
    modal
        .querySelectorAll(".input-field")
        .forEach((input) => delete input.dataset.error);
    modal
        .querySelectorAll("form")
        .forEach((input) => delete input.dataset.error);
}

/**
 * @param {SubmitEvent} event
 */
async function modalSubmit(event) {
    event.preventDefault();
    let totalErrors = 0;
    const form = event.target.parentNode;
    const nomeEl = form.querySelector("#nome");
    const funcionariosEl = form.querySelector("#funcionarios");
    const nome = nomeEl.value;
    const funcionarios = funcionariosEl.value;

    clearModalErrors(currentOpenedModal);

    if (!nome || nome.trim().length == 0) {
        nomeEl.parentNode.setAttribute("data-error", "");
        nomeEl.value = nomeEl.value.trim();
        totalErrors += 1;
    }

    if (
        !funcionarios ||
        funcionarios.trim().length == 0 ||
        Number(funcionarios) <= 0
    ) {
        funcionariosEl.parentNode.setAttribute("data-error", "");
        funcionariosEl.value = funcionariosEl.value.trim();
        totalErrors += 1;
    }

    if (totalErrors > 0) {
        return;
    }

    const result = await api("POST", {
        nome,
        funcionarios,
    });

    if (result.status == 201) {
        clearModalInputs(form.parentNode.parentNode);
        form.parentNode.parentNode.removeAttribute("data-opened");
    }

    form.setAttribute("data-error", "");
    form.querySelector(".form-error").innerText = result.data.message;
}

async function main() {
    await loadTableRows();
}

main();
