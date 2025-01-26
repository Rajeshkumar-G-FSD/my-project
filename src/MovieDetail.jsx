// src/MovieDetail.jsx
import React from 'react';
import './MovieDetail.css';

const MovieDetail = ({ movie, onBack }) => {
  return (
    <div className="movie-detail">
      <button className="back-button" onClick={onBack}>Back</button>
      <div className="movie-detail-content">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
        <div className="movie-info">
          <h2>{movie.Title}</h2>
          <p><strong>Release Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Ratings:</strong></p>
          <ul>
            {movie.Ratings.map((rating, index) => (
              <li key={index}>{rating.Source}: {rating.Value}</li>
            ))}
          </ul>
          <p><strong>Cast:</strong> {movie.Actors}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
