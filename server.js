const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')





const app = express()
//use helmet for security
app.use(helmet())

//router
const router = express.Router()

//mongoose config
mongoose.Promise = global.Promise
mongoose.connect(process.env.dbUrl || 'mongodb://core-db:27017/core', { useNewUrlParser: true })

//middlewares
app.use(bodyParser.json())
app.use(morgan('dev'))


//routes implementation
app.use(router)
app.use('/api', require('./routes'))



const port = process.env.PORT || 3000
//Intialize the server at port
app.listen(port, () => {
    console.log("running on port ")
})
