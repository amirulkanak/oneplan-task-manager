import express from 'express';
import Task from '../models/taskModel.js';
import Activity from '../models/activityModel.js';

const router = express.Router();

// POST /tasks
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();

    const activity = new Activity({
      userId: req.body.userId,
      taskId: savedTask._id,
      action: `Created task "${savedTask.title}"`,
    });
    await activity.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// GET /tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    const activity = new Activity({
      userId: req.body.userId,
      taskId: updatedTask._id,
      action: `Updated task "${updatedTask.title}"`,
    });
    await activity.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (task) {
      const activity = new Activity({
        userId: req.body.userId,
        taskId: task._id,
        action: `Deleted task "${task.title}"`,
      });
      await activity.save();
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
});

export default router;
