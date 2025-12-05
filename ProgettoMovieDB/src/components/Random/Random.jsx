// src/pages/Random/Random.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieModal from '../../components/MovieModal/MovieModal'; // Assicurati del percorso corretto
import { getRandomMovie } from '../../utils/tndbApi'; // Assicurati del percorso corretto

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
        setRandomMovie(movie);
      } catch (err) {
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
          onClose={handleCloseModal} // Usa la funzione che naviga via
        />
      )}
      {/* Opzionale: un placeholder visibile finché il modal non appare/non si chiude */}
      <div style={{ height: '100vh', width: '100vw', background: 'rgba(0,0,0,0.5)' }}></div>
    </>
  );
};

export default Random;