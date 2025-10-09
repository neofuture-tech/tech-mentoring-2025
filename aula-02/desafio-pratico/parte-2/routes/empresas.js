const express = require('express')
const router = express.Router();

const fs = require('fs')

const DATA_PATH = "./data/empresas.json"

router.get('/', (req, res) => {
    const data = fs.readFileSync(DATA_PATH, "utf-8")
    const json = data ? JSON.parse(data) : []

    return res.json(json)
})

module.exports = router