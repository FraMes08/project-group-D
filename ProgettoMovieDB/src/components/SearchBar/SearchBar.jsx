import React, { useState } from 'react';

function SearchBar({ navigateTo }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Quando l'utente cerca, navighiamo alla pagina 'search'.
      // Idealmente, passeresti la query a 'App.jsx' per aggiornare lo stato di ricerca.
      // Per semplicità, in questa versione fittizia:
      navigateTo('search', query); 
      setQuery(''); // Pulisci il campo dopo la ricerca
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Cerca un film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Cerca</button>
    </form>
  );
}

export default SearchBar;