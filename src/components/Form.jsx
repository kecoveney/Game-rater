import React, { useState } from 'react';

const Form = ({ onSaveReview }) => {
  const [game, setGame] = useState('');
  const [genre, setGenre] = useState('action');
  const [otherGenre, setOtherGenre] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    if (e.target.value !== 'other') {
      setOtherGenre('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!game || !reviewText || !rating) {
      alert('Please fill out all fields.');
      return;
    }

    const review = {
      game,
      genre: genre === 'other' ? otherGenre : genre,
      reviewText,
      rating,
      image: ""
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        review.image = reader.result;
        onSaveReview(review);
        clearForm();
      };
      reader.readAsDataURL(image);
    } else {
      onSaveReview(review);
      clearForm();
    }
  };

  const clearForm = () => {
    setGame('');
    setGenre('action');
    setOtherGenre('');
    setReviewText('');
    setRating(0);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="game">Game Name:</label>
        <input type="text" id="game" value={game} onChange={(e) => setGame(e.target.value)} placeholder="Enter game name" />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Select Genre:</label>
        <select id="genre" value={genre} onChange={handleGenreChange}>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG</option>
          <option value="strategy">Strategy</option>
          <option value="other">Other</option>
        </select>
        {genre === 'other' && (
          <input type="text" id="other-genre" value={otherGenre} onChange={(e) => setOtherGenre(e.target.value)} placeholder="Enter genre" style={{ marginTop: '10px' }} />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="review">Review:</label>
        <textarea id="review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write your review"></textarea>
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
        <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default Form;

