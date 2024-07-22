import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Auth
export const registerUser = (user) => axios.post(`${API_URL}/users`, user);
export const loginUser = async (email, password) => {
  const { data: users } = await axios.get(`${API_URL}/users`);
  return users.find(user => user.email === email && user.password === password);
};

// Reviews
export const getReviews = () => axios.get(`${API_URL}/reviews`);
export const createReview = (review) => axios.post(`${API_URL}/reviews`, review);
export const updateReview = (id, review) => axios.put(`${API_URL}/reviews/${id}`, review);
export const deleteReview = (id) => axios.delete(`${API_URL}/reviews/${id}`);
