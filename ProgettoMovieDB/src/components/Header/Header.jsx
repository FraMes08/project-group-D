import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logodefinitivo from "../../assets/logodefinitivo.png";
import "./Header.css";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const firstRender = useRef(true);
  const DEBOUNCE_MS = 500;

  // Funzione per resettare lo stato 'query'
  const resetQuery = () => {
    // Pulisce anche il debounce, nel caso in cui l'utente stia digitando mentre clicca un link
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    setQuery("");
  };

  const submitSearch = (q) => {
    // clear any pending debounced navigation and navigate immediately
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    const trimmed = (q ?? query).trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    // avoid running debounce on first mount
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = query.trim();
      if (!trimmed) {
        // input empty: do nothing (avoid forcing navigation)
        debounceRef.current = null;
        return;
      }
      navigate(`/search?query=${encodeURIComponent(trimmed)}`);
      debounceRef.current = null;
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, navigate]);

  return (
    <header className="header">
      <h1>The Movie</h1>
      <div className="buttons">
        <div className="logodefinitivo">
          <img src={logodefinitivo} alt="logo" />
        </div>

        <NavLink
          to="/popular"
          className={({ isActive }) =>
            isActive ? "popular-button active" : "popular-button"
          }
          onClick={resetQuery}
        >
          Popular
        </NavLink>
        <NavLink
          to="/top"
          className={({ isActive }) =>
            isActive ? "top-rating-button active" : "top-rating-button"
          }
          onClick={resetQuery}
        >
          Top-rating
        </NavLink>
        <NavLink
          to="/upcoming"
          className={({ isActive }) =>
            isActive ? "upcoming-button active" : "upcoming-button"
          }
          onClick={resetQuery}
        >
          Upcoming
        </NavLink>
        <NavLink
          to="/random"
          className={({ isActive }) =>
            isActive ? "random-button active" : "random-button"
          }
          onClick={resetQuery}
        >
          Random
        </NavLink>
      </div>

      <div className="dpbutton">
        <NavLink
          to="/favorites"
          className="profile-button"
          aria-label="Profilo"
          title="Profilo"
          onClick={resetQuery}
        >
          <span className="profile-avatar">👤</span>
        </NavLink>
        <button
          className="darkmode-button"
          aria-pressed="false"
          title="Toggle tema"
        >
          🌙
        </button>
      </div>

      <div className="search-row">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitSearch(e.target.value);
          }}
        />
        <button className="search-row-button" onClick={() => submitSearch()}>
          Search
        </button>
      </div>
    </header>
  );
}
