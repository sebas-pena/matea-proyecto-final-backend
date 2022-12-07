const {products} = require("../controllers/products.controller")

const router = require("express").Router()

router.post("/", products)


module.exports = router