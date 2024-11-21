const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description) {
    return res.status(400).send('Title and description are required');
  }

  const task = new Task({
    title,
    description,
    dueDate,
    user: req.user._id // Assuming req.user is populated correctly
  });

  await task.save();
  res.status(201).send(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

module.exports = { createTask, getTasks };
