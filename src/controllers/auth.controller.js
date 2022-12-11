const USER = require("../models/user")
const CART = require("../models/cart")
const { signToken } = require("../utils/handleJWT")

const singup = (req, res, next) => {
  const { username, email, password, direction } = req.body

  USER.create({ username, email, password, direction })
    .then(user => {
      CART.create({ uid: user._id }).then(cart => {
        const { password, ...userProps } = user._doc
        const token = signToken(userProps)
        res.status(201).json({ access_token: token })
      })
    })
}

const login = (req, res, next) => {
  const { email, password } = req.body
  USER.findOne({ email }, (err, user) => {
    if (err) {
      next({ message: "Internal server error." })
    } else if (!user) {
      next({ statusCode: 401, message: "Wrong credentials." })
    } else {
      user.comparePasswords(password, (err, result) => {
        if (err) {
          console.log(err)
          next({ statusCode: 500 })
        } else if (result) {
          const { password, ...userProps } = user._doc
          const token = signToken(userProps)
          res.status(200).json({ access_token: token })
        } else {
          next({ statusCode: 401, message: "Wrong credentials." })
        }
      })
    }
  })
}

module.exports = {
  login,
  singup,
}
