import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AboutUs from '../components/AboutUs';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data.slice(-1)); 
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchReviews();
    fetchGenres();
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown';
  };

  return (
    <div className='home'>
      <AboutUs />
      <div className="latest-reviews">
        <h2>Latest Review!</h2>
        <div id="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review">
              <p><strong>Game:</strong> {review.game}</p>
              <p><strong>Genre:</strong> {getGenreName(review.genre_id)}</p>
              <p><strong>Review:</strong> {review.reviewText}</p>
              <p><strong>Rating:</strong> {review.rating}</p>
              {review.image && <img src={review.image} alt={review.game} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
