const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (user) =>
  jwt.sign(
    {
      user
    },
    JWT_SECRET
  )

const parseToken = (token) => {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = {
  signToken,
  parseToken,
}