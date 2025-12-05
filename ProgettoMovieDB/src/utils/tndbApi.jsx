// Recupero le variabili d'ambiente in modo sicuro
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// Usiamo il Token V4 per l'autenticazione nell'Header, se disponibile e preferito
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_API_TOKEN; 
// Alternativa: Usiamo la Key V3 come fallback o per path specifici
const TMDB_API_KEY = import.meta.env.VITE_API_KEY; 

const headers = {
  // Autenticazione con Token V4 (più pulita)
  Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

/**
 * Funzione generica per effettuare chiamate GET a TMDB.
 * @param {string} endpoint - L'endpoint TMDB (es. '/movie/popular').
 * @param {object} params - Parametri di query aggiuntivi (opzionale).
 */
export const fetchFromTmdb = async (endpoint, params = {}) => {
  let url = `${TMDB_BASE_URL}${endpoint}`;
  
  // Se non si usa il Token V4 (VITE_API_TOKEN), si aggiunge la Key V3 (VITE_API_KEY) all'URL
  if (!TMDB_ACCESS_TOKEN && TMDB_API_KEY) {
      params = { ...params, api_key: TMDB_API_KEY };
  }
  
  // Aggiungi parametri di query (es. language, page)
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url, { 
      // Se usiamo il Token V4, includiamo gli headers
      headers: TMDB_ACCESS_TOKEN ? headers : {}
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel fetching dati da TMDB:", error);
    throw error; // Rilancia per gestire l'errore nel componente chiamante
  }
};

// --- Funzioni specifiche per i requisiti del progetto ---

export const getPopularMovies = (page = 1) => {
  return fetchFromTmdb('/movie/popular', { page });
};

export const getTopRatedMovies = (page = 1) => {
  return fetchFromTmdb('/movie/top_rated', { page });
};

export const getTrendingMovies = (time_window = 'day') => { // time_window può essere 'day' o 'week'
  return fetchFromTmdb(`/trending/movie/${time_window}`);
};

export const getMovieDetails = (movieId) => {
  // Richiedi anche attori e trailer con 'append_to_response'
  return fetchFromTmdb(`/movie/${movieId}`, { append_to_response: 'credits,videos' });
};

export const searchMovies = (query, page = 1) => {
  return fetchFromTmdb('/search/movie', { query, page });
};

export const getUpcomingMovies = (page = 1) => {
  return fetchFromTmdb('/movie/upcoming', { page });
};


export const getRandomMovie = async () => {
    // 1. Definisce un massimo di pagine da cui pescare (es. le prime 50 di Popolari/Scoperta)
    const MAX_PAGES = 50; 
    // 2. Sceglie una pagina casuale
    const randomPage = Math.floor(Math.random() * MAX_PAGES) + 1;

    try {
        // Usa l'endpoint discover per ordinare per popolarità e scegliere una pagina casuale
        const discoverData = await fetchFromTmdb('/discover/movie', { 
            page: randomPage,
            sort_by: 'popularity.desc' 
        });

        const results = discoverData.results;
        
        if (!results || results.length === 0) {
            throw new Error('Nessun risultato trovato nella pagina casuale.');
        }

        // 3. Sceglie un film a caso dall'elenco dei risultati di quella pagina
        const randomMovieFromPage = results[Math.floor(Math.random() * results.length)];

        // 4. Recupera i dettagli completi del film (necessari per la MovieModal)
        // Assumo che tu abbia una funzione getMovieDetails che includa crediti/video
        const fullDetails = await getMovieDetails(randomMovieFromPage.id);
        
        return fullDetails;

    } catch (error) {
        console.error("Errore nel recupero del film casuale:", error);
        throw error;
    }
};