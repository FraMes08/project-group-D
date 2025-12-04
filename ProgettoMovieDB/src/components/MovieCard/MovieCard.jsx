import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="vote">⭐ {movie.vote_average.toFixed(1)}</p>
        <p className="release-date">{movie.release_date}</p>
        <p className="overview">{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;