const express = require("express");
const Project = require('../models/Project')

const router = express.Router();
const { check, validationResult } = require("express-validator");

// @router POST /project
// @description /create project
// @access Private

router.post("/",[
    check('title', 'Project title is required').not().isEmpty().trim().escape(),

    check('startDate', 'Start date is required').not().isEmpty().trim().escape(),
    check('endDate', 'Start date is required').not().isEmpty().trim().escape(),
    check('description', 'Description is required').not().isEmpty().trim().escape(),
    check('priority', 'Start date is required').not().isEmpty().trim().escape(),
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {title, startDate, endDate, description, priority, status} = req.body

    try {
        const newProject = new Project({
            title, startDate, endDate, description, priority, status,
             //user
        })

        const project = await newProject.save()
        const response = {
            "success":"new project added",
            "addedProject": project
        }
        res.json(response)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }

});


// @router get /projects
// @description /fetch all projects
// @access Private
router.get('/', async(req, res) => {
    try {
        const projects = await Project.find().sort({createdOn: -1})

        const response = {
            "success":"all projects fetched",
            "foundProjects": projects
        }

        res.json(response)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

module.exports = router;
