import axios from 'axios';

// backend Api URL
// const API_URL = import.meta.env.VITE_BACKEND_API_URL;
const API_URL = 'http://localhost:5000/tasks';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (taskId, updatedData) => {
  await axios.put(`${API_URL}/${taskId}`, updatedData);
};

export const deleteTask = async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);
};
