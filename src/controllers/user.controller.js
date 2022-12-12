const USER = require("../models/user")
const { signToken } = require("../utils/handleJWT")
const handleSendFileToDiscord = require("../utils/handleSendFileToDiscord")

const updateUser = async (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  const newData = { ...req.body }
  if (req.file) {
    const response = await handleSendFileToDiscord(req.file)
    newData.profileImage = response[0].attachments[0].url
  }

  USER.findByIdAndUpdate(req.user._id, {
    $set: newData
  }, { new: true })
    .then(user => {
      const { password, ...userProps } = user._doc
      const token = signToken(userProps)
      res.status(200).json({ access_token: token })
    })
    .catch(err => {
      next({ message: err })
    })
}

module.exports = {
  updateUser
}