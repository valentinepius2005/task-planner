const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  dueDate: Date,
  completed: Boolean,
  reminder: Date,
  notes: String,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  recurring: { type: String, enum: ["None", "Daily", "Weekly", "Monthly"], default: "None" },
});

module.exports = mongoose.model('Task', TaskSchema);
