import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  timestamp: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
