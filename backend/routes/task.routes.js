const express = require("express");
const { addTask, editTask, getTask, deleteTask } = require("../controllers/task.controllers");
const router = express.Router();

router.post("/add", addTask);
router.get("/get", getTask);
router.put("/tasks/edit/:id", editTask);
router.delete("/delete/:id", deleteTask );

module.exports = router;