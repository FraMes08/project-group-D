// src/components/Carousel/Carousel.jsx

import { useState, useRef } from 'react';
import TMDBFetcher from '../TMDBFetcher/TMDBFetcher';
import MovieList from '../MovieList/MovieList'; // Useremo MovieList in modalità Carousel
import './Carousel.css';

const Carousel = ({ title, fetchPath }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Riferimento al container scorrevole (sarà applicato in MovieList)
  const listRef = useRef(null); 

  const handleMoviesLoaded = (fetchedMovies) => {
    // Limitiamo i film a 20 per il carosello
    setMovies(fetchedMovies.slice(0, 20)); 
    setIsLoading(false);
  };
  
  // Funzione per lo scorrimento
  const scroll = (direction) => {
    if (listRef.current) {
      // 25% è la larghezza di 1 card in una visualizzazione 4-colonne (100% / 4)
      const cardWidth = listRef.current.offsetWidth / 4; 
      // Scorriamo di 4 card per volta
      const scrollAmount = cardWidth * 4; 
      
      if (direction === 'left') {
        listRef.current.scrollLeft -= scrollAmount;
      } else {
        listRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="carousel-container">
      <h3 className="carousel-title">{title}</h3>
      
      {/* TMDBFetcher carica i dati, solo la prima pagina è necessaria (20 film) */}
      <TMDBFetcher 
        fetchPath={fetchPath} 
        onMoviesLoaded={handleMoviesLoaded} 
      />
      
      <div className="carousel-wrapper"> {/* Contenitore per posizionare le frecce */}
        
        {/* Freccia Sinistra */}
        <button 
          className="scroll-btn left" 
          onClick={() => scroll('left')}
          aria-label={`Scorri a sinistra ${title}`}
        >
          &lt;
        </button>
        
        {/* Lista dei film: riceve il ref e la modalità carosello */}
        <MovieList 
          movies={movies} 
          isLoading={isLoading} 
          isCarousel={true}
          listRef={listRef} 
        />
        
        {/* Freccia Destra */}
        <button 
          className="scroll-btn right" 
          onClick={() => scroll('right')}
          aria-label={`Scorri a destra ${title}`}
        >
          &gt;
        </button>
        
      </div>
    </div>
  );
};

export default Carousel;