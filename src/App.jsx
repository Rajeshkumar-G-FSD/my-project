import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://www.omdbapi.com/?apikey=361ae7fb';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query, page = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          s: `"${query}"`, 
          type: 'movie',
          page,
        },
      });
      console.log('API response:', response.data);
      setSearchResults(prevResults => [...prevResults, ...response.data.Search || []]);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Failed to fetch movie data');
    } finally {
      setIsLoading(false);
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
      <nav className="navbar">
        <div className="navbar-left">
          <a href="#" className="logo">IMDb</a>
          <button className="menu-button">
            <span className="menu-icon"></span>
          </button>
          <div className="dropdown">
            <button className="dropbtn">All</button>
            <div className="dropdown-content">
              <a href="#">Movies</a>
              <a href="#">TV Shows</a>
              <a href="#">Celebrities</a>
            </div>
          </div>
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
        </div>
        <div className="navbar-right">
          <a href="#" className="nav-link">IMDbPro</a>
          <a href="#" className="nav-link">Watchlist</a>
          <a href="#" className="nav-link">Sign In</a>
          <div className="dropdown">
            <button className="dropbtn">EN</button>
            <div className="dropdown-content">
              <a href="#">EN</a>
              <a href="#">ES</a>
              <a href="#">FR</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="content-container">
        <div className="search-results">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {error && <p>{error}</p>}
              {searchResults.length > 0 ? (
                <>
                  <div className="grid">
                    {searchResults.map((movie) => (
                      <div className="movie-card" key={movie.imdbID}>
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                        <p>{movie.Year} - {movie.Type}</p>
                      </div>
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
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
