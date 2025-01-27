// src/SearchPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = ({ searchQuery, searchResults, handleSearch, handleKeyPress, handleLoadMore, isLoading, error, selectedType, handleTypeChange }) => {
  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search IMDb..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button">🔍</button>
      </div>
      <div className="filter-container">
        <label htmlFor="type">Filter by Type:</label>
        <select id="type" value={selectedType} onChange={handleTypeChange}>
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p className="error-message">{error}</p>}
          {searchResults.length > 0 ? (
            <>
              <div className="grid">
                {searchResults.map((movie, index) => (
                  <Link to={`/movie/${movie.imdbID}`} key={`${movie.imdbID}-${index}`} className="movie-card">
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year} - {movie.Type}</p>
                  </Link>
                ))}
              </div>
              <button className="load-more-button" onClick={handleLoadMore}>
                Load More
              </button>
            </>
          ) : (
            <div className="no-results">
              <p>No results found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
