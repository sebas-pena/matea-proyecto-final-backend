const Users = require('../models/user');
const { signToken } = require('../utils/handleJWT');

const singup = (req, res, next) => {
    const { username, email, password, direction } = req.body;
    const user = new Users({ username, email, password, direction })

    user.save(err => {
        if (err) {
            console.log(err)
            next({ statusCode: 500, message: 'ERROR AL REGISTRAR AL USUSARIO' })
        } else {
            const { password, ...userProps } = user._doc
            const token = signToken(userProps)
            res.status(201).json({ access_token: token })
        }
    })

}


const login = (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({ email }, (err, user) => {
        if (err) {
            console.log(err)
            next({ message: 'ERROR AL REGISTRAR AL USUSARIO' })
        } else if (!user) {
            next({ statusCode: 401, message: 'Wrong credentials.' })
            res.status(400).json({ 'msg': 'EL USUARIO NO EXISTE' })
        } else {
            user.comparePasswords(password, (err, result) => {
                if (err) {
                    console.log(err)
                    next({ statusCode: 500 })
                } else if (result) {
                    const { password, ...userProps } = user._doc
                    const token = signToken(userProps)
                    res.status(201).json({ access_token: token })
                } else {
                    next({ statusCode: 401, message: "Wrong credentials." })
                }
            })
        }
    })
}

module.exports = {
    login,
    singup
}