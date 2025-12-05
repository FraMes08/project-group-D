// src/components/PaginationControls/PaginationControls.jsx

import './PaginationControls.css';

// TMDB limita la paginazione pratica a circa 500 pagine
const MAX_PAGES_TMDB = 500; 

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  
  // Limita il totale delle pagine al massimo gestibile dall'API
  const maxPage = Math.min(totalPages, MAX_PAGES_TMDB);

  if (maxPage <= 1) return null; // Non mostrare nulla se c'è solo una pagina

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= maxPage;
  
  // Calcola il range di film (es. 21-40)
  const itemsPerPage = 20; 
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, maxPage * itemsPerPage);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    // Scorri in cima alla pagina per una migliore UX
    window.scrollTo(0, 0); 
  };

  return (
    <div className="pagination-controls">
      {/* Freccia Precedente */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={isPrevDisabled}
        className="pagination-btn"
      >
        &larr; Precedente
      </button>

      <div className="page-status">
        <p>Pagina {currentPage} di {maxPage}</p>
        <p className="item-range">Visualizzazione film {startItem} - {endItem}</p>
      </div>

      {/* Freccia Successiva */}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={isNextDisabled}
        className="pagination-btn"
      >
        Successiva &rarr;
      </button>
    </div>
  );
};

export default PaginationControls;