export default function MovieDetails({ movieId, toggleFavorite, isFavorite, navigateTo }) {
  // useEffect per fetching dati film (titolo, trama, poster, rating, ecc.)
  // ...
  return (
    <article className="movie-details">
      {/* ... Mostra Titolo, Poster, Trama, Rating, Genere, Data di uscita ... */}
      
      <button onClick={() => toggleFavorite({ id: movieId, title: '...' })}>
        {isFavorite ? '⭐ Rimuovi dai Preferiti' : '☆ Aggiungi ai Preferiti'}
      </button>

      {/* Bonus: Attori e Trailer */}
      {/* <CastList movieId={movieId} /> */}
      {/* <Trailer movieId={movieId} /> */}
    </article>
  );
}