import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { fetchMovies } from './apiService';
import SearchPage from './SearchPage';
import MovieDetail from './MovieDetail';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // State for movie type filter
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch recent movies on initial load
    fetchMoviesData('recent');
  }, []);

  const fetchMoviesData = async (query, page = 1) => {
    setIsLoading(true);
    setError(null); // Reset error state
    try {
      const data = await fetchMovies(query, selectedType, page); // Include selectedType in the API call
      if (data.Error) {
        setError(data.Error);
      } else {
        setSearchResults((prevResults) => [...prevResults, ...data.Search || []]);
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
      fetchMoviesData(searchQuery, 1);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSearchResults([]);
    setCurrentPage(1);
    fetchMoviesData(searchQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchMoviesData(searchQuery, nextPage);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">IMDb</Link>
          <div className="dropdown">
            <button className="dropbtn">All</button>
            <div className="dropdown-content">
              <a href="#">Movies</a>
              <a href="#">TV Shows</a>
              <a href="#">Celebrities</a>
            </div>
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
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                searchQuery={searchQuery}
                searchResults={searchResults}
                handleSearch={handleSearch}
                handleKeyPress={handleKeyPress}
                handleLoadMore={handleLoadMore}
                isLoading={isLoading}
                error={error}
                selectedType={selectedType}
                handleTypeChange={handleTypeChange}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
