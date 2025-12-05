// src/pages/Upcoming/Upcoming.jsx

import { useState, useCallback } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import PaginationControls from '../../components/PaginationControls/PaginationControls'; 
import './Upcoming.css'; 

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Aggiorna gli stati movies e totalPages
  const handleMoviesLoaded = useCallback((fetchedMovies, totalP) => {
    setMovies(fetchedMovies);
    setTotalPages(totalP);
    setIsLoading(false);
  }, []); 

  // Handler per cambiare pagina
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true); 
  };

  return (
    <div className="upcoming-page">
      <h2>🗓️ Prossime Uscite</h2>
      
      <TMDBFetcher 
        fetchPath="movie/upcoming" 
        onMoviesLoaded={handleMoviesLoaded}
        currentPage={currentPage} // Passa la pagina corrente
      />
      
      <MovieList movies={movies} isLoading={isLoading} />

      {/* Mostra i controlli di paginazione */}
      {!isLoading && movies.length > 0 && (
        <PaginationControls 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Upcoming;