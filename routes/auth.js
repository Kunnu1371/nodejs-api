const User = require('../model/user')
const router = require('express').Router()
const { validator } = require('../validator/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('./verifyToken')
router.post('/user/register', validator, async (req, res) => {
    // check user exist with email in database or not. If exist send a response to login
    const user = await User.findOne({email: req.body.email})
 
    if(user) {
        return res.status(400).send("Email already exist. Please sign in")
    }

    // convert user's password into hash password
    const salt = await bcrypt.genSalt(12)
    const hash_password = await bcrypt.hash(req.body.password, salt)

    // created new user
    const newUser = new User(req.body)
    newUser.password = hash_password
    await newUser.save((err, user) => {
        if(err) {
            return res.status(400).json(err)
        }
        res.status(201).json(newUser)
    })
})


router.post('/user/login', async (req, res) => {

     // check user exist with email in database or not. If not exist send a response to sign up
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).send("User with email doesn't exist. Please sign up")
    }

    // User found
    const matchedPassword = await bcrypt.compare(req.body.password, user.password)
    if(!matchedPassword) {  
        return res.send("Wrong password")
    } 
    const token = jwt.sign({_id: user._id}, process.env.secret)
    res.header('auth-token', token)
    res.json({token: token})
    // res.send("Logged in!")
})

module.exports = router;