// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const API_URL = 'https://www.omdbapi.com/?apikey=361ae7fb';

function App() {
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async (query, page = 1) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          s: `"${query}"`, // Place the search query inside double quotes
          type: 'movie',
          page,
        },
      });
      console.log('API response:', response.data);
      setSearchResults(prevResults => [...prevResults, ...response.data.Search || []]);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Failed to fetch movie data');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchResults([]);
      setCurrentPage(1);
      fetchMovies(searchQuery, 1);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMovies(searchQuery, nextPage);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="search-results">
        {error && <p>{error}</p>}
        {searchResults.length > 0 ? (
          <>
            <div className="grid">
              {searchResults.map((movie) => (
                <div className="movie-card" key={movie.imdbID}>
                  <img src={movie.Poster} alt={movie.Title} />
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year} - {movie.Type}</p> {/* Using Year and Type as brief description */}
                </div>
              ))}
            </div>
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          </>
        ) : (
          <p>No results found</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
