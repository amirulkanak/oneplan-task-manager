const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 200 },
  category: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Done'],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  dueDate: { type: Date },
  order: { type: Number }, // For drag-and-drop ordering
});

module.exports = mongoose.model('Task', taskSchema);
