import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', ActivitySchema);

export default Activity;
