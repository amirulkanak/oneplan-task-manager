import axios from 'axios';

// backend api url
const API_URL = 'http://localhost:5000/activities';

export const fetchActivities = async (userId) => {
  const { data } = await axios.get(`${API_URL}/${userId}`);
  return data;
};
