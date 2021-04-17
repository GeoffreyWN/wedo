const express = require("express");
const Project = require('../models/Project')

const router = express.Router();
const { body, validationResult } = require("express-validator");

// @router POST /api/v1/project
// @description /create project
// @access Private

router.post("/", [
    body('title', 'Project title is required').not().isEmpty().trim().escape().custom(value => {
        return Project.findOne({ 'title': value }).then(project => {
            if (project) {
                return Promise.reject(`Sorry Project with title '${value}' already exists`)
            }
        })
    }),

    body('startDate', 'Start date is required').not().isEmpty().trim().escape(),
    body('endDate', 'Start date is required').not().isEmpty().trim().escape(),
    body('description', 'Description is required').not().isEmpty().trim().escape(),
    body('priority', 'Start date is required').not().isEmpty().trim().escape(),
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, startDate, endDate, description, priority, status } = req.body

        try {
            const newProject = new Project({
                title, startDate, endDate, description, priority, status,
                //user
            })

            const project = await newProject.save()
            const response = {
                "success": "new project added",
                "addedProject": project
            }
            res.json(response)

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error')
        }

    });


// @router GET /api/v1/projects
// @description /fetch all projects
// @access Private
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdOn: -1 })

        const response = {
            "success": "all projects fetched",
            "foundProjects": projects
        }

        res.json(response)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

//@router PUT /api/v1/project/:id/projects
//@description /update a project
//@access Private

router.put('/update/:project_id',
    [
        body('title', 'Project title is required').not().isEmpty().trim().escape(),
        body('startDate', 'Start date is required').not().isEmpty().trim().escape(),
        body('endDate', 'Start date is required').not().isEmpty().trim().escape(),
        body('description', 'Description is required').not().isEmpty().trim().escape(),
        body('priority', 'Start date is required').not().isEmpty().trim().escape(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { title, startDate, endDate, description, priority, status } = req.body
        const project_id = req.params.project_id

        try {
            const project = await Project.findById(project_id)

            if (!project) {
                return res.status(400).json({ msg: "Project not found" })
            }

            const updatedProject = await Project.findOneAndUpdate({ '_id': project.id }, { $set: { title, startDate, endDate, description, priority, status, updatedOn: Date.now() } }, { new: true })



            const response = {
                "success": "project was updated",
                "updatedProject": updatedProject
            }
            res.json(response)

        } catch (error) {
            console.error(error.message);
            if (error.kind === 'ObjectId') {
                return res.status(422).json({ msg: "invalid project id" })
            }
            res.status(500).send('Server error')
        }
    })

module.exports = router;
