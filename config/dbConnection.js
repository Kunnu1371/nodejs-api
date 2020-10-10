const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.url
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log("DB connected!!!"))
.catch((err) =>  console.log("Error: ", err))