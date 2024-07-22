import React from 'react';

const getStarRating = (rating) => {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="${i <= rating ? 'filled' : ''}">&#9733;</span>`;
  }
  return stars;
};

const ReviewList = ({ reviews }) => (
  <div id="reviews-list">
    {reviews.map((review, index) => (
      <div className="review" key={index}>
        <p><strong>Game:</strong> {review.game}</p>
        <p><strong>Genre:</strong> {review.genre}</p>
        <p><strong>Review:</strong> {review.reviewText}</p>
        <div className="star-rating-display" dangerouslySetInnerHTML={{ __html: getStarRating(review.rating) }}></div>
        {review.image && <img src={review.image} alt={review.game} />}
      </div>
    ))}
  </div>
);

export default ReviewList;
