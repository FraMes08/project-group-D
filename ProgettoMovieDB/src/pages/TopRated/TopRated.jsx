import { useState } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import './TopRated.css'; // Crea il file CSS se necessario

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Questa funzione è chiamata dal TMDBFetcher quando i dati sono stati recuperati.
  const handleMoviesLoaded = (fetchedMovies) => {
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <div className="top-rated-page">
      <h2>⭐ Film con la Migliore Votazione</h2>
      
      {/* Passa l'endpoint TMDB per i film più votati: 'movie/top_rated'. */}
      <TMDBFetcher 
        fetchPath="movie/top_rated" 
        onMoviesLoaded={handleMoviesLoaded} 
      />
      
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default TopRated;