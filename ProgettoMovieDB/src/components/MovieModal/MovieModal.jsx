import { useState } from 'react';
import useGenreMap from '../../hooks/useGenreMap';
import useMovieDetails from '../../hooks/useMovieDetails';
import '../MovieCard/MovieCard.css';
import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  const { genreMap } = useGenreMap();
  const { cast, trailerKey } = useMovieDetails(movie?.id);
  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      return !!(movie && favs.some((f) => f.id === movie.id));
    } catch {
      return false;
    }
  });

  if (!movie) return null;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (isFavorite) {
        const updated = favs.filter((f) => f.id !== movie.id);
        localStorage.setItem('favorites', JSON.stringify(updated));
        setIsFavorite(false);
      } else {
        // save the entire movie object so MovieCard can render full details on favorites page
        const toAdd = { ...movie };
        const updated = [...favs, toAdd];
        localStorage.setItem('favorites', JSON.stringify(updated));
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Errore favorites:', err);
    }
  };

  const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('movie-modal-overlay')) onClose();
  };

  // Determina la sorgente dei generi
  const genresSource = movie.genres && movie.genres.length > 0
    ? movie.genres // Array di oggetti { id, name } - Usato per i dettagli completi (e Random)
    : movie.genre_ids && movie.genre_ids.map(id => ({ id, name: genreMap[id] || `Genre ${id}` })); // Array di ID - Usato per le liste

  return (
    <div className="movie-modal-overlay" onClick={handleOverlayClick}>
      <div className="movie-modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Chiudi">×</button>

        <div className="modal-media">
          {trailerKey ? (
            <iframe
              width="100%"
              height="320"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={imageUrl} alt={movie.title} />
          )}
        </div>

        <div className="modal-body">
          <div className="modal-left">
            <div className="modal-title-row">
              <h2 className="modal-title">{movie.title}</h2>
              <button
                className={`favorite-btn inline ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                aria-pressed={isFavorite}
                aria-label={isFavorite ? 'Rimuovi preferito' : 'Aggiungi ai preferiti'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            <div className="modal-tags">
              {/* Utilizza la sorgente dei generi determinata sopra */}
              {genresSource && genresSource.length > 0 && (
                <div className="tags">
                  {genresSource.slice(0, 4).map((genre) => (
                    <span key={genre.id} className="tag">{genre.name}</span>
                  ))}
                </div>
              )}
            </div>

            <p className="modal-overview">{movie.overview}</p>
            <div className="modal-cast">
              Cast: {cast.length > 0 ? cast.map((actor) => actor.name).join(', ') : '—'}
            </div>
            <div className="modal-footer">
              <div className="modal-vote">⭐ {movie.vote_average?.toFixed(1)}</div>
              <div className="modal-release">{movie.release_date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;