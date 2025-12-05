import { useState, useEffect } from 'react';

const TMDBFetcher = ({ fetchPath, onMoviesLoaded }) => { 
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // Esci se non c'è un path valido o una chiave API
    if (!TMDB_API_KEY || !fetchPath) {
      if (!TMDB_API_KEY) {
         setError("Chiave API TMDB non configurata nel file .env!");
      }
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Usa fetchPath nella URL
        // Aggiungo anche language e page se non sono già gestiti altrove
        const url = `https://api.themoviedb.org/3/${fetchPath}?api_key=${TMDB_API_KEY}&language=it-IT&page=1`;
        
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Errore durante il recupero dei dati: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Passa i dati al componente padre tramite la prop onMoviesLoaded
        onMoviesLoaded(data.results || []); 
        
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          onMoviesLoaded([]); // Assicurati che il parent riceva un array vuoto in caso di errore
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    
    // Cleanup function per annullare la richiesta se il componente viene smontato
    return () => controller.abort();
  }, [TMDB_API_KEY, fetchPath, onMoviesLoaded]); // Aggiungi le dipendenze

  // Il fetcher non renderizza la lista, ma solo il messaggio di errore/caricamento.
  if (error) {
    return <div style={{color: 'red'}}>❌ Errore API: {error}</div>;
  }
  
  if (isLoading) {
    return <div></div>;
  }

  // Ritorna null o un indicatore di caricamento leggero, 
  // ma non MovieList, perché MovieList viene renderizzato dal componente padre.
  return null; 
};

export default TMDBFetcher;