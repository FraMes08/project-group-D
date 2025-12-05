import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
    if (!TMDB_API_KEY) {
      setError('API key non configurata');
      return;
    }

    const controller = new AbortController();

    const fetchSearch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Errore durante la ricerca');
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();

    return () => controller.abort();
  }, [query]);

  return (
    <section className="search-page">
      <h2>Risultati per: "{query}"</h2>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <MovieList movies={movies} isLoading={isLoading} />
    </section>
  );
}