const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, reminder, notes, priority, recurring } = req.body;
  const newTask = new Task({
    userId: req.userId,
    title,
    description,
    reminder,
    notes,
    priority,
    recurring,
    completed: false,
  });
  await newTask.save();
  res.json(newTask);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({
    priority: -1,
    dueDate: 1,
  });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
