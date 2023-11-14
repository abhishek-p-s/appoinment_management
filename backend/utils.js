var jwt = require("jsonwebtoken");
const User = require("./model/userModal");

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
        jwt.verify(token, process.env.JWT_SECRET || 'secretkey', async (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' })
            } else {
                req.user = decode;
                const user = await User.findById(decode._id).populate("role")
                if (user) {
                    req.user = user;
                    next()
                } else {
                    res.status(404).send({ message: "User Not Found" })
                }
            }
        })
    } else {
        res.status(401).send({ message: 'Unauthorized Access' })
    }
}

module.exports = { generateToken, isAuth }