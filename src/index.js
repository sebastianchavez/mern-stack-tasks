const express = require('express')
const app = express()
const morgan = require('morgan')
const routes = require('./routes/tasks.routes')
const path = require('path')
const { mongoose } = require('./db')

// Settings
app.set('port',process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/tasks',routes)

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`)
})