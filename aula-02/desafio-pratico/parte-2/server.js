const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const PORT = 3000

app.listen(process.env.PORT | PORT, () => console.log("Server is running on 3000"))

