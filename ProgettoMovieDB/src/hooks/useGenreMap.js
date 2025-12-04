import { useState, useEffect } from 'react';

const useGenreMap = () => {
  const [genreMap, setGenreMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
    if (!TMDB_API_KEY) {
      setIsLoading(false);
      return;
    }

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) throw new Error('Errore nel fetch dei generi');
        const data = await response.json();
        
        // Crea map: { id: name, id: name, ... }
        const map = {};
        data.genres.forEach((genre) => {
          map[genre.id] = genre.name;
        });
        setGenreMap(map);
      } catch (err) {
        console.error('Errore nel caricamento generi:', err);
        setGenreMap({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genreMap, isLoading };
};

export default useGenreMap;
