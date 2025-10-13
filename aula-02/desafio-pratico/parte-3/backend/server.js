const express = require('express')
const cors = require('cors')
const app = express()

const empresasRoutes = require('./routes/empresas')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/api/empresas", empresasRoutes)


const PORT = 3000

app.listen(process.env.PORT | PORT, () => console.log("Server is running on 3000"))