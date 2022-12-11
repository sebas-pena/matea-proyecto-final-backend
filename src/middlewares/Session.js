const USER = require("../models/user")
const { parseToken } = require("../utils/handleJWT")

const Session = async (req, res, next) => {
  const accessToken = req.headers['authorization'].split(" ").pop()
  if (!accessToken) next({ statusCode: 403, message: 'access denied' });
  const payload = parseToken(accessToken)
  if (payload) {
    const user = await USER.findById(payload.user._id)
    req.user = user
    next()
  } else {
    next({ statusCode: 403, message: 'access denied' })
  }
}

module.exports = { Session }