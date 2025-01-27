// src/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update import to useNavigate
import { fetchMovieDetails } from './apiService';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Update to useNavigate
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const data = await fetchMovieDetails(id);
        if (data.Error) {
          setError(data.Error);
        } else {
          setMovie(data);
        }
      } catch (error) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return movie ? (
    <div className="movie-detail">
      <button className="back-button" onClick={handleBackClick}>Back</button>
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
  ) : (
    <p>No movie details found</p>
  );
};

export default MovieDetail;
