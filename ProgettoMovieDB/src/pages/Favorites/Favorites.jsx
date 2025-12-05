import { useEffect, useState } from 'react';
import './Favorites.css';
import '../../components/MovieList/MovieList.css';
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Favorites() {
  // read favorites synchronously on first render to avoid blank UI while effect runs
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]');
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'favorites') {
        try {
          setFavorites(JSON.parse(e.newValue || '[]'));
        } catch {
          setFavorites([]);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // enrich favorites by fetching full details from TMDB if some fields are missing
  useEffect(() => {
    const TMDB_API_KEY = import.meta.env.VITE_API_KEY;
    if (!TMDB_API_KEY) return;

    let cancelled = false;

    const needsEnrichment = favorites.some((m) => (
      m.vote_average === undefined || !m.overview || !m.poster_path
    ));

    if (!needsEnrichment) return;

    const enrich = async () => {
      setIsLoading(true);
      try {
        const promises = favorites.map(async (m) => {
          // if object already has key fields, return as-is
          if (m.vote_average !== undefined && m.overview && m.poster_path) return m;
          try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${TMDB_API_KEY}`);
            if (!res.ok) return m;
            const data = await res.json();
            // merge fields into stored object
            return { ...m, ...data };
          } catch {
            return m;
          }
        });

        const enriched = await Promise.all(promises);
        if (!cancelled) {
          setFavorites(enriched);
          try {
            localStorage.setItem('favorites', JSON.stringify(enriched));
          } catch (err) {
            // ignore localStorage write errors
            console.warn('Could not write enriched favorites to localStorage', err);
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    enrich();

    return () => { cancelled = true; };
  }, [favorites]);

  const removeFavorite = (id) => {
    try {
      const updated = (JSON.parse(localStorage.getItem('favorites') || '[]') || []).filter(f => f.id !== id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
    } catch (err) {
      console.error('Errore rimuovendo preferito', err);
    }
  };

  return (
    <section className="favorites-page">
      <h2>I Tuoi Film Preferiti ({favorites.length})</h2>

      {isLoading && (
        <p className="favorites-loading">Caricamento dati preferiti…</p>
      )}

      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <div key={movie.id} className="favorite-item">
              <button className="remove-fav" onClick={(e) => { e.stopPropagation(); removeFavorite(movie.id); }}>Rimuovi</button>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <p>Non hai ancora aggiunto film ai preferiti.</p>
        )}
      </div>
    </section>
  );
}