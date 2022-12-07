const express = require("express")
const cors = require("cors")
const errorHandler = require("./middlewares/ErrorHandler")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", require("./router"))
app.use(errorHandler)
module.exports = app