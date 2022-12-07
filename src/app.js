const express = require("express")
const errorHandler = require("./middlewares/ErrorHandler")

const app = express()

app.use(express.json())
app.use("/api", require("./router"))
app.use(errorHandler)
module.exports = app