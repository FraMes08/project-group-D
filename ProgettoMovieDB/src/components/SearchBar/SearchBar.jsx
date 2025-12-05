import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function SearchBar() {
  // 1. Usiamo useSearchParams per leggere e scrivere la query nell'URL
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Legge la query corrente dall'URL o usa una stringa vuota
  const urlQuery = searchParams.get('query') || '';

  // 2. Usiamo uno stato locale per l'input, inizializzato con la query dell'URL
  const [inputValue, setInputValue] = useState(urlQuery);

  // Sincronizza lo stato locale (inputValue) con l'URL (urlQuery)
  useEffect(() => {
      setInputValue(urlQuery);
  }, [urlQuery]);

  // Gestisce la sottomissione del form
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();

    if (trimmedQuery) {
      // 3. Scrivi la nuova query nell'URL e naviga alla pagina /search
      setSearchParams({ query: trimmedQuery });
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    } else {
      // 4. Se la query è vuota, pulisci i searchParams e naviga alla homepage
      setSearchParams({}); 
      navigate(`/`);
    }
    
    // NOTA: Non puliamo più inputValue qui. Lo lasciamo visualizzato 
    // nell'input in modo che l'utente veda ancora il termine cercato se resta sulla 
    // pagina di ricerca. La pulizia DEVE avvenire nella navigazione.
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Cerca un film..."
        value={inputValue}
        // Aggiorna lo stato locale quando l'utente digita
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Cerca</button>
    </form>
  );
}

export default SearchBar;