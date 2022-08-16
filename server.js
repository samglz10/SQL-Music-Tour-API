const { Sequelize } = require('sequelize')
// SEQUELIZE CONNECTION
/*const sequelize = new Sequelize({
    storage: process.env.PG_URI,
    dialect: 'postgres',
    username: 'postgres',
    password: 'x'
  })

    try {
        sequelize.authenticate() 
        console.log(`Connected with Sequelize at ${process.env.PG_URI}`) 
    } catch(err) {
        console.log(`Unable to connect to PG: ${err}`) 
    }
*/

// DEPENDENCIES
const express = require('express')
const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controllers')
app.use('/bands', bandsController)

const eventController = require('./controllers/event_controllers')
app.use('/events', eventController)

const stagesController = require('./controllers/stage_controllers')
app.use('/stages', stagesController)


// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: http://localhost:${process.env.PORT}/`)
})