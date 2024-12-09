const mongoose = require("mongoose");
const Task = require("../models/task.models");

const addTask = async (req, res) => {
    try {
        const {title} = req.body;
        if (!title) {
            return res.status(400).json({message: "Title is required"});
        };
        const task = new Task({title});
        await task.save();
        res.status(201).json({message: "Task added successfully", task});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

const getTask = async (req, res) => {
    try {
        const task = await Task.find({});
        if (!task) {
            return res.status(404).json({message: "Task not found"});
        };
        res.status(200).json({task});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

const editTask = async (req, res) => {
    try {
      const { title } = req.body;
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title },
        { new: true } // Mengembalikan data yang diperbarui
      );
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error});
    }
  };

const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: 'Invalid ID'});
        };
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        };
        res.status(200).json({message: "Task deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", error});
    };
};

module.exports = {addTask, editTask, getTask, deleteTask};