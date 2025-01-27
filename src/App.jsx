import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
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
    setError(null); // Reset error state
    try {
      const response = await axios.get(API_URL, {
        params: {
          s: `"${query}"`,
          type: '',
          page,
        },
      });
      if (response.data.Error) {
        setError(response.data.Error);
      } else {
        setSearchResults(prevResults => [...prevResults, ...response.data.Search || []]);
      }
    } catch (error) {
      setError('Failed to fetch movie data. Please try again later.');
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
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">OMDb</Link>
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
              placeholder="Search OMDb..."
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button">🔍</button>
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" className="nav-link">OMDbPro</a>
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
        <Routes>
          <Route exact path="/" element={
            <SearchPage
              searchQuery={searchQuery}
              searchResults={searchResults}
              handleSearch={handleSearch}
              handleKeyPress={handleKeyPress}
              handleLoadMore={handleLoadMore}
              isLoading={isLoading}
              error={error}
            />
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
