import { useState } from 'react';
import './MovieCard.css';
import MovieModal from '../MovieModal/MovieModal';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const vote = movie && typeof movie.vote_average === 'number'
    ? movie.vote_average.toFixed(1)
    : '—';

  const release = movie?.release_date || '';
  const overview = movie?.overview ? `${movie.overview.substring(0, 100)}...` : '';

  return (
    <>
      <div
        className="movie-card"
        role="button"
        tabIndex={0}
        onClick={() => setShowModal(true)}
        onKeyDown={(e) => { if (e.key === 'Enter') setShowModal(true); }}
      >
        <img src={posterUrl} alt={movie?.title || 'Movie poster'} className="movie-poster" />
        <div className="movie-info">
          <h3>{movie?.title || 'Untitled'}</h3>
          <p className="vote">⭐ {vote}</p>
          <p className="release-date">{release}</p>
          <p className="overview">{overview}</p>
        </div>
      </div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MovieCard;
