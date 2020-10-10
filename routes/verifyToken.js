const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verifyToken = async (req, res, next) => {
    const token = await req.header('auth-token')
    if(!token) return res.status(401).json({msg: "Access Denied!", token: token})
    try {
        const verified = await jwt.verify(token, process.env.secret)
        req.user = verified
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
    next()
}