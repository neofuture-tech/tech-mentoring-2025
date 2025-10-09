const express = require("express");
const router = express.Router();

const fs = require("fs");

const DATA_PATH = "./data/empresas.json";

class Empresa {
    /**
     * @param {string} nome
     * @param {number} funcionarios
     */
    constructor(nome, funcionarios) {
        this.nome = nome;
        this.funcionarios = funcionarios;
        this.id = -1;
    }

    /**
     * @returns {boolean}
     */
    isValid() {
        return this.nome && this.funcionarios;
    }

    /**
     * @returns { {nome?: string, funcionarios?: string}}
     */
    errors() {
        let errors = {};
        if (!this.nome) {
            errors["nome"] = "O campo nome é obrigatório";
        }

        if (!this.funcionarios) {
            errors["funcionarios"] = "O campo funcionários é obrigatório";
        }

        return errors;
    }
}

/**
 * @returns {Empresa[]}
 */
function getDataEmpresas() {
    let data = null;

    if (fs.existsSync(DATA_PATH)) {
        data = fs.readFileSync(DATA_PATH, "utf-8");
    }

    return data ? JSON.parse(data) : [];
}

router.get("/", (_req, res) => {
    const empresas = getDataEmpresas();

    return res.json(empresas);
});

router.get("/:id", (req, res) => {
    const paramId = req.params.id

    const empresaList = getDataEmpresas();

    const empresaData = empresaList.find((e) => e.id == paramId)

    if (!empresaData)
    {
        return res.status(404).json({ message: "Empresa não encontrada" });
    }

    res.status(200).json(empresaData);
})

router.post("/", (req, res) => {
    const body = req.body;
    const empresa = new Empresa(body.nome, body.funcionarios);

    if (!empresa.isValid()) {
        return res.status(400).json({
            message: "Dados inválidos!",
            errors: empresa.errors(),
        });
    }

    const empresaList = getDataEmpresas();

    if (
        empresaList.find(
            (e) => e.nome.toLowerCase() == empresa.nome.toLowerCase()
        )
    ) {
        return res.status(409).json({ message: "Empresa já cadastrada" });
    }

    empresa.id =
        empresaList.length > 0
            ? empresaList.reduce(
                  (max, e) => (e.id > max.id ? e : max),
                  empresaList[0]
              ).id + 1
            : 0;

    empresaList.push(empresa);

    fs.writeFileSync(DATA_PATH, JSON.stringify(empresaList));

    res.status(201).json("Empresa criada com sucesso!");
});


router.put("/:id", (req, res) => {
    const body = req.body;
    const paramId = req.params.id

    const empresa = new Empresa(body.nome, body.funcionarios);

    if (!empresa.isValid()) {
        return res.status(400).json({
            message: "Dados inválidos!",
            errors: empresa.errors(),
        });
    }

    const empresaList = getDataEmpresas();
    const empresaData = empresaList.find((e) => e.id == paramId)

    if (!empresaData)
    {
        return res.status(404).json({ message: "Empresa não encontrada" });
    }

    if (
        empresaList.find(
            (e) => e.nome.toLowerCase() == empresa.nome.toLowerCase() && e.id != empresaData.id
        )
    ) {
        return res.status(409).json({ message: "Empresa já cadastrada com outro Id" });
    }

    empresaData.nome = empresa.nome
    empresaData.funcionarios = empresa.funcionarios

    fs.writeFileSync(DATA_PATH, JSON.stringify(empresaList));

    res.status(200).json("Empresa atualizada com sucesso!");
});

router.delete("/:id", (req, res) => {
    
    const paramId = req.params.id

    const empresaList = getDataEmpresas();
    const empresaData = empresaList.find((e) => e.id == paramId)

    if (!empresaData)
    {
        return res.status(404).json({ message: "Empresa não encontrada" });
    }

    const newEmpresaList = empresaList.filter(e => e.id !== empresaData.id)

    fs.writeFileSync(DATA_PATH, JSON.stringify(newEmpresaList));

    res.status(200).json("Empresa removida com sucesso!");
})

module.exports = router;
