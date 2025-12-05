// src/pages/Upcoming/Upcoming.jsx

import { useState } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import './Upcoming.css';

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMoviesLoaded = (fetchedMovies) => {
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <div className="upcoming-page">
      <h2>Prossime Uscite</h2>
      {/* Passiamo l'endpoint specifico per gli Upcoming */}
      <TMDBFetcher 
        fetchPath="movie/upcoming" 
        onMoviesLoaded={handleMoviesLoaded} 
      />
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default Upcoming;