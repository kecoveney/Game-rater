import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopRecommendedGames = () => {
  const [topGames, setTopGames] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchTopGames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        // Filter, sort by date, and remove duplicates by game name
        const filteredReviews = response.data.filter(review => review.rating === 5);
        const uniqueGames = Array.from(new Set(filteredReviews.map(review => review.game)))
          .map(game => {
            return filteredReviews.find(review => review.game === game);
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5); // Get the latest 5 unique games
        setTopGames(uniqueGames);
      } catch (error) {
        console.error('Error fetching top games:', error);
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

    fetchTopGames();
    fetchGenres();
  }, []);

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown';
  };

  return (
    <div className="top-recommended-games">
      <h2>Top 5 Recommended Games</h2>
      <div id="top-games-list">
        {topGames.map((game) => (
          <div key={game.id} className="game">
            <p><strong>Game:</strong> {game.game}</p>
            <p><strong>Genre:</strong> {getGenreName(game.genre_id)}</p>
            {game.image && <img src={game.image} alt={game.game} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRecommendedGames;
