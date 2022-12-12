const USER = require("../models/user")
const CART = require("../models/cart")
const bcrypt = require("bcrypt")
const { signToken } = require("../utils/handleJWT")

const singup = (req, res, next) => {
  const { username, email, password } = req.body
  bcrypt.hash(password, 8, (err, hashedPassword) => {
    if (err) {
      next(err)
    } else {
      USER.create({ username, email, password: hashedPassword })
        .then(user => {
          CART.create({ uid: user._id }).then(cart => {
            const { password, ...userProps } = user._doc
            const token = signToken(userProps)
            res.status(201).json({ access_token: token })
          })
        }).catch((e) => {
          console.log(e)
          next({ message: "internal server error" })
        }
        )
    }
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
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) next(err)
        if (result) {
          const { password, ...userProps } = user._doc
          const token = signToken(userProps)
          res.status(200).json({ access_token: token })
        }
        else next({ statusCode: 401, message: "Wrong credentials." })
      })
    }
  })
}

module.exports = {
  login,
  singup,
}
