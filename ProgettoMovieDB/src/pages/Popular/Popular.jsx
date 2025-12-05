// src/pages/Popular/Popular.jsx

import { useState } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import './Popular.css'; // Crea un file CSS se necessario

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMoviesLoaded = (fetchedMovies) => {
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <div className="popular-page">
      <h2>Film Più Popolari</h2>
      
      {/* Utilizza l'endpoint specifico per i film Popolari. 
        Nota: Se la tua pagina Home è identica, potresti semplicemente rinominare Home in Popular, 
        o reindirizzare /popular a /.
      */}
      <TMDBFetcher 
        fetchPath="movie/popular" 
        onMoviesLoaded={handleMoviesLoaded} 
      />
      
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default Popular;