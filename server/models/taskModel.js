import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 50 },
  description: { type: String, maxlength: 200 },
  category: {
    type: String,
    enum: ['To-Do', 'In Progress', 'Done'],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  dueDate: { type: Date },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
