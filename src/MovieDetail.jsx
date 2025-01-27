// src/MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Update import to useNavigate
import axios from 'axios';
import './MovieDetail.css';

const API_URL = 'https://www.omdbapi.com/?apikey=361ae7fb';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Update to useNavigate
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get(API_URL, {
          params: {
            i: id,
          },
        });
        if (response.data.Error) {
          setError(response.data.Error);
        } else {
          setMovie(response.data);
        }
      } catch (error) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
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
