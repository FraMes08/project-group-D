// src/pages/TopRated/TopRated.jsx

import { useState, useCallback } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import PaginationControls from '../../components/PaginationControls/PaginationControls'; 
import './TopRated.css'; 

const TopRated = () => {
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
    <div className="top-rated-page">
      <h2>⭐ Film con la Migliore Votazione</h2>
      
      <TMDBFetcher 
        fetchPath="movie/top_rated" 
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

export default TopRated;