exports.validator = (req, res, next) => {
    req.check('name', 'name should be at least 4 characters long').isLength({min: 4, max: 100}),
    req.check('email', 'Please enter a valid email').isEmail(),
    req.check('password', 'password should be at least 6 character long').isLength({ min: 6 })

    const errors = req.validationErrors()
    if (errors) {
        const fisrtError = errors.map(error => error.msg)[0]
        return res.status(400).json(fisrtError);
    }
    next()
}
