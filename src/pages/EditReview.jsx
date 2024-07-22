import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    game: '',
    genre_id: '',
    reviewText: '',
    rating: 0,
    image: ''
  });
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    };

    const fetchReview = async () => {
      const response = await axios.get(`http://localhost:5000/reviews/${id}`);
      setReview(response.data);
    };

    fetchGenres();
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setReview({ ...review, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = { ...review };

    if (review.image && typeof review.image === 'object') {
      const reader = new FileReader();
      reader.onloadend = async () => {
        updatedReview.image = reader.result;
        await updateReview(updatedReview);
      };
      reader.readAsDataURL(review.image);
    } else {
      await updateReview(updatedReview);
    }
  };

  const updateReview = async (updatedReview) => {
    try {
      await axios.put(`http://localhost:5000/reviews/${id}`, updatedReview);
      navigate('/reviews');
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="review-submission">
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="game">Game Name:</label>
          <input
            type="text"
            id="game"
            name="game"
            value={review.game}
            onChange={handleChange}
            placeholder="Enter game name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Select Genre:</label>
          <select
            id="genre"
            name="genre_id"
            value={review.genre_id}
            onChange={handleChange}
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="reviewText"
            value={review.reviewText}
            onChange={handleChange}
            placeholder="Write your review"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <div className="rating-group">
            {[1, 2, 3, 4, 5].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={review.rating === star}
                  onChange={handleChange}
                />
                <label htmlFor={`star${star}`}>{star}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditReview;
