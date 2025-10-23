const API_BASE = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000/api/empresas"
  : "/api/empresas";

const tbody = document.getElementById("tbody");
const rowTpl = document.getElementById("row-template");
const form = document.getElementById("create-form");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

async function api(path = "", options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let detail = "";
    try { const j = await res.json(); detail = j.error ? ` (${j.error})` : ""; } catch {}
    throw new Error(`Erro HTTP ${res.status}${detail}`);
  }
  if (res.status === 204) return null; 
  return res.json();
}

function rowView({ id, nome, funcionarios }) {
  const tr = rowTpl.content.firstElementChild.cloneNode(true);
  tr.dataset.id = id;
  tr.querySelector('[data-col="nome"]').textContent = nome;
  tr.querySelector('[data-col="funcionarios"]').textContent = funcionarios;

  tr.querySelector(".edit").addEventListener("click", () => startEdit(tr));
  tr.querySelector(".delete").addEventListener("click", () => onDelete(id));
  return tr;
}

function startEdit(tr) {
  const id = tr.dataset.id;
  const nomeTd = tr.querySelector('[data-col="nome"]');
  const funcTd = tr.querySelector('[data-col="funcionarios"]');
  const actionsTd = tr.querySelector(".actions");

  const nomeInput = document.createElement("input");
  nomeInput.type = "text";
  nomeInput.value = nomeTd.textContent;
  const funcInput = document.createElement("input");
  funcInput.type = "number";
  funcInput.min = "0";
  funcInput.value = funcTd.textContent;

  nomeTd.textContent = "";
  funcTd.textContent = "";
  nomeTd.appendChild(nomeInput);
  funcTd.appendChild(funcInput);

  actionsTd.innerHTML = "";
  const saveBtn = document.createElement("button");
  saveBtn.className = "btn primary";
  saveBtn.textContent = "Salvar";
  const cancelBtn = document.createElement("button");
  cancelBtn.className = "btn ghost";
  cancelBtn.textContent = "Cancelar";

  actionsTd.append(saveBtn, cancelBtn);

  saveBtn.addEventListener("click", async () => {
    try {
      setStatus("Salvando...");
      const payload = {
        nome: nomeInput.value.trim(),
        funcionarios: Number(funcInput.value),
      };
      const updated = await api(`/${id}`, { method: "PUT", body: JSON.stringify(payload) });
      tr.replaceWith(rowView(updated));
      setStatus("Empresa atualizada com sucesso.");
    } catch (e) {
      setStatus(e.message);
    }
  });

  cancelBtn.addEventListener("click", () => {
   
    const current = { id, nome: nomeInput.value, funcionarios: funcInput.value };
    tr.replaceWith(rowView(current));
    setStatus("");
  });
}

async function onDelete(id) {
  if (!confirm("Tem certeza que deseja deletar esta empresa?")) return;
  try {
    setStatus("Deletando...");
    await api(`/${id}`, { method: "DELETE" });
    const row = tbody.querySelector(`tr[data-id="${id}"]`);
    if (row) row.remove();
    setStatus("Empresa deletada.");
  } catch (e) {
    setStatus(e.message);
  }
}

async function load() {
  try {
    setStatus("Carregando...");
    const empresas = await api("");
    tbody.innerHTML = "";
    empresas.forEach((e) => tbody.appendChild(rowView(e)));
    setStatus(`Total: ${empresas.length} empresa(s).`);
  } catch (e) {
    setStatus(e.message);
  }
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const nome = form.nome.value.trim();
  const funcionarios = Number(form.funcionarios.value);
  if (!nome || !Number.isFinite(funcionarios) || funcionarios < 0) {
    setStatus("Preencha os campos corretamente.");
    return;
  }
  try {
    setStatus("Criando...");
    const criada = await api("", { method: "POST", body: JSON.stringify({ nome, funcionarios }) });
    tbody.appendChild(rowView(criada));
    form.reset();
    setStatus("Empresa criada!");
  } catch (e) {
    setStatus(e.message);
  }
});

load();
