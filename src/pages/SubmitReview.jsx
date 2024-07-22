import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmitReview = ({ user }) => {
  const [game, setGame] = useState('');
  const [genreId, setGenreId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    };
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!game || !reviewText || !rating || !genreId) {
      alert('Please fill out all fields.');
      return;
    }

    const review = {
      game,
      genre_id: parseInt(genreId),
      reviewText,
      rating,
      image: "",
      user_id: user.id
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        review.image = reader.result;
        await saveReview(review);
        clearForm();
        navigate('/'); // Redirect to home after submission
      };
      reader.readAsDataURL(image);
    } else {
      await saveReview(review);
      clearForm();
      navigate('/'); // Redirect to home after submission
    }
  };

  const saveReview = async (review) => {
    try {
      await axios.post('http://localhost:5000/reviews', review);
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  const clearForm = () => {
    setGame('');
    setGenreId('');
    setReviewText('');
    setRating(0);
    setImage(null);
  };

  return (
    <div className="review-submission">
      <h2>Submit Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="game">Game Name:</label>
          <input
            type="text"
            id="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            placeholder="Enter game name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Select Genre:</label>
          <select id="genre" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
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
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
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
                  checked={rating === star}
                  onChange={() => setRating(star)}
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
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default SubmitReview;
