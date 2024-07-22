import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Reviews = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showUserReviews, setShowUserReviews] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get('http://localhost:5000/reviews');
      setReviews(response.data);
      setFilteredReviews(response.data);
    };
    const fetchGenres = async () => {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    };
    fetchReviews();
    fetchGenres();
  }, []);

  const handleSearch = (query) => {
    const filtered = reviews.filter((review) =>
      review.game.toLowerCase().includes(query.toLowerCase()) ||
      review.reviewText.toLowerCase().includes(query.toLowerCase()) ||
      genres.find((genre) => genre.id === parseInt(review.genre_id))?.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  };

  const getGenreName = (id) => {
    const genre = genres.find((genre) => genre.id === parseInt(id));
    return genre ? genre.name : 'Unknown';
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      setFilteredReviews(filteredReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const toggleShowUserReviews = () => {
    if (showUserReviews) {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter((review) => review.user_id === user.id));
    }
    setShowUserReviews(!showUserReviews);
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>
      <SearchBar onSearch={handleSearch} />
      {user && (
        <button className="toggle-button" onClick={toggleShowUserReviews}>
          {showUserReviews ? 'Show All Reviews' : 'Show My Reviews'}
        </button>
      )}
      <div id="reviews-list">
        {filteredReviews.map((review) => (
          <div key={review.id} className="review">
            <p><strong>Game:</strong> {review.game}</p>
            <p><strong>Genre:</strong> {getGenreName(review.genre_id)}</p>
            <p><strong>Review:</strong> {review.reviewText}</p>
            <p><strong>Rating:</strong> {review.rating}</p>
            {review.image && <img src={review.image} alt={review.game} />}
            {user && user.id === review.user_id && (
              <div className="button-group">
                <button className="delete-button" onClick={() => handleDelete(review.id)}>Delete</button>
                <button className="edit-button" onClick={() => navigate(`/edit-review/${review.id}`)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
