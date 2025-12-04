import { useState } from 'react';
import './MovieCard.css';
import MovieModal from '../MovieModal/MovieModal';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <>
      <div
        className="movie-card"
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => { if (e.key === 'Enter') setShowModal(true); }}
      >
        <img src={posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p className="vote">⭐ {movie.vote_average.toFixed(1)}</p>
          <p className="release-date">{movie.release_date}</p>
          <p className="overview">{movie.overview.substring(0, 100)}...</p>
        </div>
      </div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MovieCard;
