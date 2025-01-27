# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

IMDb Movie Search App
This is a simple React application that allows users to search for movies, series, and episodes using the IMDb API. Users can view detailed information about each movie and filter search results based on type (movie, series, episode).

Features
Search Movies: Users can search for movies by entering a query in the search bar.

Filter by Type: Users can filter search results based on the type (movie, series, episode) using a dropdown filter.

View Movie Details: Users can click on a movie card to view detailed information about the movie, including the plot, genre, release year, ratings, and cast.

Load More Results: Users can load more search results by clicking the "Load More" button.

Error Handling: The app gracefully handles errors and displays user-friendly messages when API requests fail.

Technologies Used
React

React Router

Axios

IMDb API

Project Structure
src/
├── apiService.js        # API service functions to fetch movie data
├── App.css              # Global styles
├── App.jsx              # Main application component
├── index.js             # Entry point of the application
├── MovieDetail.css      # Styles for the MovieDetail component
├── MovieDetail.jsx      # Component to display detailed movie information
├── SearchPage.css       # Styles for the SearchPage component
└── SearchPage.jsx       # Component to display search results and filter options
Installation
Clone the repository:

bash
git clone https://github.com/your-username/imdb-movie-search.git
cd imdb-movie-search
Install dependencies:

bash
npm install
Start the development server:

bash
npm start
Usage
Open the application in your browser at http://localhost:3000.

Use the search bar to enter a movie query and press Enter.

Use the dropdown filter to select the type of content (movie, series, episode).

Click on a movie card to view detailed information.

Click the "Load More" button to load more search results.

Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.