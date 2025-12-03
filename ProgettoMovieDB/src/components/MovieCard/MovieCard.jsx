import "./MovieCard.css";
import { useState } from "react";

export default function MovieCard({ movie }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleClick = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={movie.image}
        alt={`${movie.title} cover`}
        className="movie-card-image"
      />
      <h3 className="movie-card-title">{movie.title}</h3>
      <p className="movie-card-platform">{movie.platform}</p>
      <p className="movie-card-dateyear">Release: {movie.dateyear}</p>
      <p className="movie-card-price">Price: ${movie.price}</p>
      {showDetails && (
        <>
          <p className="movie-card-rating">Rating: {movie.rating}/10</p>
          <p className="movie-card-timeplayed">
            Time Played: {movie.timeplayed} hours
          </p>
          <p className="movie-card-difficulty">
            Difficulty: {movie.difficulty}
          </p>
        </>
      )}
    </div>
  );
}
