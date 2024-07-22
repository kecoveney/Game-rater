import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await axios.get('http://localhost:5000/users');
      setUsers(usersResponse.data);
      const reviewsResponse = await axios.get('http://localhost:5000/reviews');
      setReviews(reviewsResponse.data);
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const user = users.find(user => user.id === userId);
      if (user) {
        const updatedUser = { ...user, isAdmin: true };
        await axios.put(`http://localhost:5000/users/${userId}`, updatedUser);
        setUsers(users.map(u => u.id === userId ? updatedUser : u));
      }
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };


  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-section">
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username}
              <div className="admin-buttons">
                <button onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="admin-section">
        <h3>Reviews</h3>
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              {review.game}
              <div className="admin-buttons">
                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
