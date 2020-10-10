const router = require('express').Router()
const { verifyToken }  = require('./verifyToken')

router.get('/user/posts',verifyToken, (req, res) => {
    res.json({posts: "You are authorized...", user: req.user})
})

module.exports = router