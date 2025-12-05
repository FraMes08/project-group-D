// src/components/TMDBFetcher/TMDBFetcher.jsx

import { useState, useEffect } from 'react';

// Accetta la nuova prop currentPage
const TMDBFetcher = ({ fetchPath, onMoviesLoaded, currentPage = 1 }) => { 
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const TMDB_API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // ... (controlli iniziali invariati)
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
        // !!! MODIFICA CHIAVE: usa la prop currentPage nella URL !!!
        const url = `https://api.themoviedb.org/3/${fetchPath}?api_key=${TMDB_API_KEY}&language=it-IT&page=${currentPage}`;
        
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`Errore durante il recupero dei dati: ${response.statusText}`);
        }

        const data = await response.json();
        
        // !!! MODIFICA CHIAVE: Passa i metadati della paginazione (total_pages) al padre
        onMoviesLoaded(
          data.results || [],
          data.total_pages || 1 // Nuova informazione passata
        ); 
        
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          onMoviesLoaded([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    
    // Aggiungi currentPage come dipendenza
    return () => controller.abort();
  }, [TMDB_API_KEY, fetchPath, onMoviesLoaded, currentPage]); 

  if (error) {
    return <div style={{color: 'red'}}>❌ Errore API: {error}</div>;
  }
  
  if (isLoading) {
    return ;
  }
  
  return null; 
};

export default TMDBFetcher;