import { useState, useEffect } from 'react';

const useMovieDetails = (movieId) => {
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setIsLoading(false);
      return;
    }

    const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
    if (!TMDB_API_KEY) {
      setError('API Key non configurata');
      setIsLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        // Fetch cast
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        );
        if (!creditsResponse.ok) throw new Error('Errore nel fetch del cast');
        const creditsData = await creditsResponse.json();
        setCast(creditsData.cast?.slice(0, 5) || []);

        // Fetch videos (trailer)
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
        );
        if (!videosResponse.ok) throw new Error('Errore nel fetch dei video');
        const videosData = await videosResponse.json();
        
        // Estrai il primo trailer YouTube disponibile
        const trailer = videosData.results?.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);
        
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento dettagli film:', err);
        setCast([]);
        setTrailerKey(null);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return { cast, trailerKey, isLoading, error };
};

export default useMovieDetails;
