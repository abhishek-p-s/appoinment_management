var jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET || 'secretkey', {
        expiresIn: '30d'
    })
}

const isAuth = (req, res, next) => {
    //console.log("hi")
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        //console.log(token)
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' })
            } else {
                req.user = decode;
                next()
            }
        })
    } else {
        res.status(401).send({ message: 'Unauthorized Access' })
    }
}

module.exports = { generateToken, isAuth }