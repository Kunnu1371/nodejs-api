const app = require('express')()
require('dotenv').config()
const authRoute = require('./routes/auth') 
const postsRoute = require('./routes/posts')
const expressValidator = require('express-validator')
app.use(require('express').json())
app.use(expressValidator());
  
app.use('/api', authRoute)  
app.use('/api', postsRoute)

const port = process.env.port
app.listen(port, () => console.log("server started on port http://localhost:3000"))
require('./config/dbConnection')