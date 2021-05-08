const express = require("express");
const Project = require('../models/Project')

const router = express.Router();
const { body, validationResult } = require("express-validator");

// @router POST /api/v1/projects
// @description /create project
// @access Private  TODO:

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
                "msg": " success new project added",
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
// @access Private  TODO:
router.get('/', async (req, res) => {
    try {
        // await Project.updateMany({}, {$set: {deleted: false}}) added a deleted field to existing documents to reflect updated schema
        const projects = await Project.where('deleted').equals(false).sort({ createdOn: -1 })
        // const projects = await Project.find({deleted: false}).sort({createdOn: -1})
        if (!projects) {
            res.status(404).send('No projects found')
        }

        const response = {
            "msg": "success: all projects fetched",
            "foundProjects": projects
        }

        res.json(response)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})

//@router PUT /api/v1/projects/update/:project_id/
//@description /update a project
//@access Private  TODO:
//TODO: check whether another project title exists before saving

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

            const updatedProject = await Project.findByIdAndUpdate({ '_id': project.id }, { $set: { title, startDate, endDate, description, priority, status, updatedOn: Date.now() } }, { new: true })

            const response = {
                "msg": " success project was updated",
                "updatedProject": updatedProject,
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


//@router PUT /api/v1/projects/remove/:project_id/
//@description /soft delete a project
//@access Private TODO:

router.put('/remove/:project_id',
    async (req, res) => {
        try {
            const project_id = req.params.project_id
            const project = await Project.findById(project_id)

            if (!project) {
                return res.status(404).json({ msg: "Project not found" })
            }

            const deletedProject = await Project.findOneAndUpdate({ '_id': project.id }, { $set: { 'deleted': true, updatedOn: Date.now() } }, { new: true })

            const response = {
                "msg": " success project was removed",
                "removedProject": deletedProject
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

//@router DELETE /api/v1/projects/delete/:project_id/
//@description /permanently delete a project
//@access Private TODO:

router.delete('/delete/:project_id',
    async (req, res) => {
        try {
            const project_id = req.params.project_id
            const project = await Project.findById(project_id)

            if (!project) {
                return res.status(404).json({ msg: "Project not found" })
            }
            // const deleted = await project.deleteOne()
            const deletedProject = await Project.findOneAndDelete({ _id: project_id })


            const response = {
                "msg": " success project was deleted",
                "deletedProject": deletedProject
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

// @route /api/v1/projects/:project_id
// @description fetch a single project
// @aceess Private TODO:

router.get('/:project_id', async (req, res) => {
    const project_id = req.params.project_id
    try {
        const foundProject = await Project.findOne({ _id: project_id })

        if (!foundProject) {
            return res.status(400).json({ msg: "Project not found" })
        }
        const response = {
            "msg": "success project found",
            "deletedProject": foundProject
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
