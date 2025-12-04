import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">The Movie</h2>
        <p className="footer-text">
          Il tuo portale per scoprire nuovi film e serie.
        </p>
      </div>

      <div className="footer-bottom">
        <p>Sviluppato da Italo Coppolella, 
        Francesco Messana e 
        Riccardo Vargiu</p>
        <p>Tutti i diritti riservati</p>
      </div>
    </footer>
  );
}
