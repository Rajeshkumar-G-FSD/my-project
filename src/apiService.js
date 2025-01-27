// src/apiService.js
import axios from 'axios';

const API_URL = 'https://www.omdbapi.com/?apikey=361ae7fb';

export const fetchMovies = async (query, type = '', page = 1) => {
  const response = await axios.get(API_URL, {
    params: {
      s: query,
      type,
      page,
    },
  });
  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(API_URL, {
    params: {
      i: id,
    },
  });
  return response.data;
};
