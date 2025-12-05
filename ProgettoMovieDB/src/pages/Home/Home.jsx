import { useState } from 'react';
import TMDBFetcher from '../../components/TMDBFetcher/TMDBFetcher';
import MovieList from '../../components/MovieList/MovieList';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMoviesLoaded = (fetchedMovies) => {
    setMovies(fetchedMovies);
    setIsLoading(false);
  };

  return (
    <div className="home">
      <TMDBFetcher onMoviesLoaded={handleMoviesLoaded} />
      <MovieList movies={movies} isLoading={isLoading} />
    </div>
  );
};

export default Home;