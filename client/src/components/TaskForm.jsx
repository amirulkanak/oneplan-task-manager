import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

function TaskForm({ task, onClose }) {
  const [user] = useAuthState(auth);
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('To-Do');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    // Prepopulate fields when editing an existing task
    if (task && task._id) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setCategory(task.category || 'To-Do');
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      );
    }
  }, [task]);

  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => {
      const token = await user.getIdToken();
      await axios.post('/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      onClose();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const token = await user.getIdToken();
      await axios.put(`/tasks/${updatedTask._id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate title and description length
    if (title.length > 50 || description.length > 200) {
      toast.error(
        'Title must be less than 50 characters and description must be less than 200 characters.'
      );
      return;
    }

    const taskData = {
      title,
      description,
      category,
      dueDate: dueDate || undefined,
    };

    if (task?._id) {
      updateTaskMutation.mutate({ ...task, ...taskData });
    } else {
      addTaskMutation.mutate(taskData);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-full lg:w-1/3 dark:bg-gray-800 p-4 rounded shadow mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white">
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded">
            {task?._id ? 'Update Task' : 'Add Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskForm;
