// src/pages/Home/Home.jsx

import Carousel from '../../components/Carousel/Carousel';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Benvenuto in The Movie App</h1>
      
      {/* Carousel 1: Popolari */}
      <Carousel 
        title="🎬 Film Più Popolari"
        fetchPath="movie/popular" // Endpoint popolare
      />

      {/* Carousel 2: I Più Votati (Top Rated) */}
        <Carousel 
          title="⭐ I Più Votati di Sempre"
          fetchPath="movie/top_rated"
        />


        {/* Carousel 3: Prossime Uscite (Upcoming) */}
        <Carousel 
          title="🗓️ Prossime Uscite"
          fetchPath="movie/upcoming"
        />
      
      
    </div>
  );
};

export default Home;




