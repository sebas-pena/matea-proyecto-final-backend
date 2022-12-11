const { addToCart, getCart } = require("../controllers/cart.controller")
const { Session } = require("../middlewares/session")
const router = require("express").Router()

router.get("/", Session, getCart)
router.patch("/", Session, addToCart)

module.exports = router