const tableBody = document.querySelector(".container table tbody");
const modalCreateEnterprise = document.querySelector(".create-enterprise");
const modalEditEnterprise = document.querySelector(".edit-enterprise");
const notifiesContainer = document.querySelector(".notifies");

const DELETE_BUTTON_ICON = `<!-- delete-outline.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Deletar item">
  <title>Deletar item</title>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18"/>
    <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </g>
</svg>
`;

const EDIT_BUTTON_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Editar">
  <title>Editar</title>
  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20h9"/>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1l1-4L16.5 3.5z"/>
  </g>
</svg>`;

const CLOSE_BUTTON_ICON = `<svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            role="img"
                            aria-label="Fechar"
                        >
                            <g
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M18 6 L6 18" />
                                <path d="M6 6 L18 18" />
                            </g>
                        </svg>`;

var currentOpenedModal = null;

/**
 * @param { 'POST' | 'GET' | 'PUT' | 'DELETE' } method
 * @param { { body?: object | undefined, path?: string | undefined} } [options={}]
 */
async function api(method, options = {}) {
    const fetchOptions = {
        method,
        body: options.body ? JSON.stringify(options.body) : "",
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (!["POST", "PUT"].includes(method)) delete fetchOptions.body;

    const path =
        "http://localhost:3000/api/empresas" +
        (options.path ? options.path : "");

    const result = await fetch(path, fetchOptions);
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
function createRow(id, nome, funcionarios) {
    const tableRow = document.createElement("tr");

    if (!id && !nome && !funcionarios) {
        return tableRow;
    }

    const nomeTableData = document.createElement("td");
    const funcionariosTableData = document.createElement("td");
    const actionsTableData = document.createElement("td");

    actionsTableData.classList.add("actions");

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.type = "button";
    editButton.innerHTML = EDIT_BUTTON_ICON;
    actionsTableData.appendChild(editButton);

    editButton.addEventListener("click", () => {
        openModal(modalEditEnterprise);
        modalEditEnterprise.dataset.idx = id;
        const nomeEl = modalEditEnterprise.querySelector("#nome");
        const funcionariosEl =
            modalEditEnterprise.querySelector("#funcionarios");
        nomeEl.value = nome;
        funcionariosEl.value = funcionarios;
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.type = "button";
    deleteButton.innerHTML = DELETE_BUTTON_ICON;
    actionsTableData.appendChild(deleteButton);

    deleteButton.appendChild(createConfirmDeleteRow(id));

    deleteButton.addEventListener("click", (event) => {
        const confirmDeleteRow =
            deleteButton.querySelector(".popup-delete-row");
        if (!confirmDeleteRow) return;

        if (confirmDeleteRow.contains(event.target)) return;

        confirmDeleteRow.toggleAttribute("data-opened");

        document.addEventListener("click", function docListener(event) {
            if (!deleteButton.contains(event.target)) {
                confirmDeleteRow.removeAttribute("data-opened");
                document.removeEventListener("click", docListener);
            }
        });
    });

    nomeTableData.innerText = nome;
    funcionariosTableData.innerText = funcionarios;

    tableRow.appendChild(nomeTableData);
    tableRow.appendChild(funcionariosTableData);
    tableRow.appendChild(actionsTableData);

    tableRow.dataset.idx = id;

    return tableRow;
}

function createConfirmDeleteRow(id) {
    const popupDeleteRow = document.createElement("div");
    popupDeleteRow.classList.add("popup-delete-row");

    const popupButton = document.createElement("button");
    popupButton.type = "button";
    popupButton.innerHTML = "Confirmar";
    popupButton.classList.add("btn");
    popupButton.classList.add("popup-confirm");

    popupButton.addEventListener("click", async () => {
        if (tableBody.dataset.loading == "true") return;
        tableBody.dataset.loading = true;
        const result = await api("DELETE", { path: `/${id}` });
        if (result.status == 200) {
            createNotify("Empresa deletada com sucesso!", "success");
            tableBody.querySelector(`tr[data-idx="${id}"]`).remove();
        }
        tableBody.dataset.loading = false;
    });

    popupDeleteRow.appendChild(popupButton);

    return popupDeleteRow;
}

function createLoadingRow() {
    const row = createRow("", "", "");
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
                createRow(empresa.id, empresa.nome, empresa.funcionarios)
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
    clearModalErrors(currentOpenedModal);
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
        body: { nome, funcionarios: Number(funcionarios) },
    });

    if (result.status == 201) {

        createNotify("Empresa criada com sucesso!", "success");

        const row = createRow(
            result.data.id,
            result.data.nome,
            result.data.funcionarios
        );
        tableBody.appendChild(row);
        clearModalInputs(form.parentNode.parentNode);
        closeModal();
    }

    form.setAttribute("data-error", "");
    form.querySelector(".form-error").innerText = result.data.message;
}

/**
 * @param {SubmitEvent} event
 */
async function modalEditSubmit(event) {
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

    if (!modalEditEnterprise.dataset.idx) {
        form.setAttribute("data-error", "");
        form.querySelector(".form-error").innerText =
            "ID da empresa não encontrado.";
        return;
    }

    const result = await api("PUT", {
        body: { nome, funcionarios: Number(funcionarios) },
        path: `/${modalEditEnterprise.dataset.idx}`,
    });

    if (result.status == 200) {

        createNotify("Empresa editada com sucesso!", "success");

        const existingRow = tableBody.querySelector(
            `tr[data-idx="${result.data.id}"]`
        );
        existingRow.querySelector("td:nth-child(1)").innerText =
            result.data.nome;
        existingRow.querySelector("td:nth-child(2)").innerText =
            result.data.funcionarios;
        clearModalInputs(modalEditEnterprise);
        closeModal();
    }

    form.setAttribute("data-error", "");
    form.querySelector(".form-error").innerText = result.data.message;
}

function createNotify(message, type = "info") {
    const notify = document.createElement("div");
    notify.classList.add("card-notify");

    const notifyContent = document.createElement("div");
    notifyContent.classList.add("card-notify-content");
    notifyContent.innerText = message;

    const closeButton = document.createElement("span");
    closeButton.classList.add("close");
    closeButton.innerHTML = CLOSE_BUTTON_ICON;

    closeButton.addEventListener("click", () => {
        notify.remove();
    });

    const loading = document.createElement("div");
    loading.classList.add("card-notify-loading");

    notifyContent.appendChild(closeButton);
    notify.appendChild(notifyContent);
    notify.appendChild(loading);

    setTimeout(() => {
        notify.remove();
    }, 5000);

    notifiesContainer.appendChild(notify);
}

async function main() {
    await loadTableRows();
}

main();
