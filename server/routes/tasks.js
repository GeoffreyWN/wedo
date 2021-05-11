const express = require("express");
const { body, validationResult } = require("express-validator");

const Task = require("../models/Task");
const Project = require("../models/Project");

const router = express.Router();

//@route POST /api/v1/tasks/addtask/:project_id
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
      console.log("Project tasks :", project.tasks);
      console.log("Existing task :", checkTask);
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
      console.log("Saved project: ", project);

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
    const tasks = await Task.find({ deleted: false }).sort({ createdAt: -1 }).populate('project', ['title', 'description']);

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

//@route PUT /api/v1/tasks/updatetask/:task_id
//@description /update a task
//@access Private  TODO:

router.put(
  "/updatetask/:task_id",
  [
    body("title", "Task title is required").not().isEmpty().trim(),
    body("priority", "Priority is required").not().isEmpty().trim(),
    body("status", "Status is required").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { title, remarks, status, priority } = req.body;
    const taskId = req.params.task_id;

    try {
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ msg: "Task not found" });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        { _id: taskId },
        { $set: { title, remarks, status, priority, updatedAt: Date.now() } },
        { new: true }
      );

      const response = {
        msg: "Task updated successfully",
        updatedTask: updatedTask,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error.message);
      if (error.kind === "ObjectId") {
        return res.status(422).json({ msg: "Invalid task Id" });
      }
      return res.status(500).json({ msg: "Server error" });
    }
  }
);

//@route PUT /api/v1/tasks/removetask/:task_id
//@description /remove a task (soft-delete)
//@access Private  TODO:

router.put("/removetask/:task_id", async (req, res) => {
  const taskId = req.params.task_id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task was not found" });
    }
    const removedTask = await Task.findByIdAndUpdate(
      { _id: taskId },
      { $set: { deleted: true, updatedAt: Date.now() } },
      { new: true }
    );

    const response = {
      msg: "Task removed successfully",
      removedTask: removedTask,
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(422).json({ msg: "Invalid task" });
    }
    return res.status(500).json({ msg: "server error" });
  }
});

//@route delete /api/v1/tasks/deletetask/:task_id
//@description /permanently delete a task
//@access Private  TODO:

router.delete("/deletetask/:task_id", async (req, res) => {
  const taskId = req.params.task_id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task was not found" });
    }

    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    const response = {
      msg: "success task was deleted",
      deletedTask: deletedTask,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(422).json({ msg: "Invalid task" });
    }
    return res.status(500).json({ msg: "server error" });
  }
});

//@route get /api/v1/tasks/:task_id
//@description /retrieve a task
//@access Private  TODO:

router.get("/:task_id", async (req, res) => {
  const taskId = req.params.task_id;

  try {
    const task = await Task.findById(taskId).populate('project', ['title', 'description'])
    if (!task) {
      return res.status(404).json({ msg: "Task was not found" });
    }
    const response = {
      msg: "Success!! Task was found",
      task: task,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(422).json({ msg: "Invalid task Id" });
    }
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
