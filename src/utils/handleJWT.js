const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const signToken = (user) =>
  jwt.sign(
    {
      user
    },
    JWT_SECRET
  )

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = {
  signToken,
  verifyToken,
}


/* 

function validateToken(req, res, next) => {
    const accessToken = req.headers['authorization']
    if (!accessToken) res.status(403).json({ msg: 'access denied' });

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.send('Access denied token incorrect')
        } else {
            console.log(req.user + 'aqui validacion')
            res.status(200).json({ msg: 'Exito' })
            next()
        }
    })
}

*/