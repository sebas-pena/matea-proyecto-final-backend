const { updateCart, getCart, setCart } = require("../controllers/cart.controller")
const { Session } = require("../middlewares/session")
const router = require("express").Router()

router.get("/", Session, getCart)
router.post("/", Session, updateCart)
router.patch("/", Session, setCart)

module.exports = router