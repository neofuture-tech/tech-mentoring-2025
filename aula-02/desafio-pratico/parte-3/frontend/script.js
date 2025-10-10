const tableBody = document.querySelector(".container table tbody");

/**
 * @param { 'POST' | 'GET' | 'PUT' | 'DELETE' } method
 * @param { object | undefined } [body=undefined]
 */
async function api(method, body = undefined) {
    const options = {
        method,
        body: body ? JSON.stringify(body) : "",
    };

    if (!["POST", "PUT"].includes(method)) delete options.body;

    const result = await fetch("http://localhost:3000/api/empresas", options);

    return await result.json();
}

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
    const empresaList = await api("GET");

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

async function main() {
    await loadTableRows();
}

main();
