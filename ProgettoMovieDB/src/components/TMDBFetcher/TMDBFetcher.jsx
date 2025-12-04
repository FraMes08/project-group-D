import { useState, useEffect } from 'react';
import MovieList from '../MovieList/MovieList';

const TMDBFetcher = ({ movieTitle = 'Inception' }) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!TMDB_API_KEY) {
      setError("Chiave API TMDB non configurata nel file .env!");
      setIsLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Errore durante il recupero dei dati: ${response.statusText}`);
        }

        const data = await response.json();
        setMovieData(data.results);
        setError(null);
        
      } catch (err) {
        setError(err.message);
        setMovieData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [TMDB_API_KEY, movieTitle]);

  if (error) {
    return <div style={{color: 'red'}}>❌ Errore API: {error}</div>;
  }

  return <MovieList movies={movieData} isLoading={isLoading} />;
};

export default TMDBFetcher;