const { updateUser } = require("../controllers/user.controller")
const { Session } = require("../middlewares/session")
const Upload = require("../middlewares/Upload")

const router = require("express").Router()

router.patch("/", Session, Upload.single("profileImage"), updateUser)

module.exports = router