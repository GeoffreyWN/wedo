const express = require("express");
const { body, validationResult } = require("express-validator");

const Task = require("../models/Task");
const Project = require("../models/Project");

const router = express.Router();

//@route POST /api/v1/tasks
// @description /create task
// @access Private  TODO:
router.post(
  "/addtask/:project_id",
  [
    body("title", "Task title is required").not().isEmpty().trim().escape(),
    body("priority", "Priority is required").not().isEmpty().trim().escape(),
    body("status", "Status is required").not().isEmpty().trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, priority, status, remarks } = req.body;

    try {
      const projectId = req.params.project_id;

      const project = await Project.findOne({ _id: projectId });
      const checkTask = await project.tasks.find(
        (task) => task.title === title
      );
      console.log('Project tasks :', project.tasks);
      console.log('Existing task :', checkTask);
      if (checkTask) {
        return res
          .status(422)
          .json({ msg: `Task with title: ${title} already exists!` });
      }

      const newTask = new Task({
        title,
        priority,
        status,
        remarks,
        project: projectId,
      });

      const task = await newTask.save();
      // add task to project
      project.tasks.unshift({ id: task._id, title: task.title });
      await project.save();
      console.log('Saved project: ', project);

      const response = {
        msg: `Success task with title ${title} was added`,
        addedTask: task,
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  }
);

//@route GET /api/v1/tasks
// @description /fetch tasks
// @access Private  TODO:
router.get("/", async (req, res) => {
  try {
    // TODO: fetch based on project
    const tasks = await Task.find({ deleted: false }).sort({ createdAt: -1 });

    if (!tasks) {
      return res.status(404).json({ msg: "No tasks found" });
    }

    const response = {
      msg: "Success. Here are the tasks",
      allTasks: tasks,
    };

    return res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
