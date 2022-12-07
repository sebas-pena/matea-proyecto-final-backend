const { singup, login } = require("../controllers/auth.controller")

const router = require("express").Router()

router.post("/login", login)
router.post("/singup", singup)

module.exports = router