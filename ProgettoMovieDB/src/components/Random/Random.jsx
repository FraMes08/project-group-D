// src/pages/Random/Random.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieModal from '../../components/MovieModal/MovieModal'; 
// !!! VERIFICA IL NOME DEL FILE QUI (TMDB è l'originale) !!!
import { getRandomMovie } from '../../utils/tndbApi'; 

const Random = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 1. Funzione per chiudere il modal e navigare alla homepage
  const handleCloseModal = () => {
    // Chiude il modal e reindirizza alla homepage (o alla pagina precedente)
    navigate('/'); 
  };

  // 2. Effettua il fetching del film casuale
  useEffect(() => {
    const fetchRandom = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movie = await getRandomMovie();
        // Controllo aggiuntivo per assicurarsi che i dettagli completi siano validi
        if (!movie || !movie.id) {
            throw new Error('I dettagli del film casuale non sono validi.');
        }
        setRandomMovie(movie);
      } catch (err) {
        // Log in console per debug
        console.error("Errore nel fetching random:", err); 
        setError(err.message);
        // Naviga via in caso di errore
        navigate('/'); 
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRandom();
  }, [navigate]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Caricamento film casuale...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>❌ Errore: {error}. Riprova!</div>;
  }

  // 3. Mostra il MovieModal non appena i dati sono disponibili
  return (
    <>
      {randomMovie && (
        <MovieModal 
          movie={randomMovie} 
          onClose={handleCloseModal}
        />
      )}
      {/* Overlay per bloccare l'interazione con lo sfondo */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.5)' }}></div>
    </>
  );
};

export default Random;