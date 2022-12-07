const userModel = require("../models/user")
const { verifyToken } = require("../utils/handleJWT")

const session = async (req, res, next) => {

  const accessToken = req.headers['authorization']
  if (!accessToken) next({ statusCode: 403, message: 'access denied' });

  jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(user)
      req.user = user
      next()
    } else {
      next({ statusCode: 403, message: 'Exito' })
    }
  })
}

module.exports = session