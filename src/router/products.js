const {
  createProduct,
  getProduct,
} = require("../controllers/products.controller")

const router = require("express").Router()

router.post("/", createProduct)
router.get("/", getProduct)

module.exports = router
