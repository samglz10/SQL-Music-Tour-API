//DEPENDENCIES
const events = require ('express').Router()
const db = require('../models')
const { Event, Stage, SetTime, MeetGreet } = db

//FIND ALL EVENTS -SET TO ASCENDING DATE?
events.get('/',async (req,res)=> {
    try {
        const foundEvents =await Event.finAll()
        res.status(200).json(foundEvents)
    } catch(error){
        res.status(500).json(error)
    }
})

//EVENT BY ID -SET TO ASCENDING DATE?
events.get('/:name', async(req,res)=> {
    try {
        const foundEvent =await Event.findOne({
            where: {name:req.params.name},
            include: [
                {model: Stage, as: "stages"}, 
                {model: SetTime, as: "set_times"}, 
                {model: MeetGreet, as: "meet_greets"}
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE AN EVENT --SET TO ASCENDING DATE?
events.post('/', async (req,res) => {
    try {
        const newEvent = await Event.create(req.body)
        console.log(newEvent)
        res.status(200).json({
            message: 'Successfully inserted a new Event',
            data: newEvent
        })
    } catch(error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//UPDATE AN EVENT --SET TO ASCENDING DATE?
events.put('/:id', async (req,res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id:req.params.id
            }
        })
        res.status(200).json({
            message:`Successfully updated ${updatedEvents} event`
    })
    } catch(error) {
        res.status(500).json(err)
    }
})

//DELETE AN EVENT --SET TO ASCENDING DATE?
events.delete('/:id', async (req,res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event`
        })
    }catch(err) {
        res.status(500).json(err)
    }
})

//EXPORT 
module.exports = events
