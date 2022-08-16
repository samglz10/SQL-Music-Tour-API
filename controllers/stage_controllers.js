// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const events = require('./event_controllers')
const { Stage, Event  } = db 

//FIND ALL STAGES
stages.get('/', async (req, res) => {
    try{
        const foundStages =await Stage.finAll()
        res.status(200).json(foundStages)
    }catch(error) {
        res.status(500).json(error)
    }
})

// STAGES BY ID
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {name: req.params.name},
            include: {model: Event, as: "stage_events"}
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE A STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        console.log(newStage)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(error) {
        res.status(500).json(error)
        console.log(error)
    }
})

//UPDATE A STAGE
stages.put('/:id', async (req, res)=> {
    try {
        const updatedStages =await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A STAGE 
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Succesfully deleted ${deletedStages} stage(s)`
        }) 
    } catch (error) {
            res.status(500).json(error)
        }

})

module.exports = stages