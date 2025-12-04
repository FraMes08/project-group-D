import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MovieList = ({ movies = [], isLoading }) => {
  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Caricamento film...</div>;
  }

  if (!movies || movies.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Nessun film trovato.</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;