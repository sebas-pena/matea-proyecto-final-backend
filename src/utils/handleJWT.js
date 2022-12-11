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
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    console.log(e)
    return null
  }
}

module.exports = {
  signToken,
  parseToken,
}