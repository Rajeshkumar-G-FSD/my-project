// src/SearchPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = ({ searchQuery, searchResults, handleSearch, handleKeyPress, handleLoadMore, isLoading, error }) => {
  return (
    <div className="search-page">
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          {searchResults.length > 0 ? (
            <>
              <div className="grid">
                {searchResults.map((movie) => (
                  <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
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
