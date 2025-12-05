// src/components/MovieList/MovieList.jsx

import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

// 1. Accetta le prop isCarousel e listRef
const MovieList = ({ movies = [], isLoading, isCarousel = false, listRef }) => { 
  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Caricamento film...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Nessun film trovato.</div>;
  }

  // 2. LOGICA CHIAVE: Se isCarousel è true, usa 'movie-carousel-list', 
  // altrimenti usa 'movie-grid-list' (che è il nuovo nome per la tua vecchia classe 'movie-list').
  const listClass = isCarousel ? 'movie-carousel-list' : 'movie-grid-list'; 

  return (
    // 3. Applica la classe selezionata e il riferimento per lo scroll
    <div className={listClass} ref={listRef}> 
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;