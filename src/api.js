// src/api.js
import axios from 'axios';

const API_KEY = 'your_omdb_api_key';  // Replace with your actual API key
const BASE_URL = 'http://www.omdbapi.com/';

// Fetch movie data by title
export const fetchMoviesByTitle = async (title) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: title,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by title:', error);
    throw error;
  }
};

// Fetch movie details by ID
export const fetchMovieDetailsById = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details by ID:', error);
    throw error;
  }
};
