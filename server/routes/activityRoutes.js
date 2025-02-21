import express from 'express';
import Activity from '../models/activityModel.js';

const router = express.Router();

// Get all activities for a user
router.get('/:userId', async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId }).sort({
      timestamp: -1,
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving activities', error });
  }
});

// Add a new activity
router.post('/', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error logging activity', error });
  }
});

export default router;
