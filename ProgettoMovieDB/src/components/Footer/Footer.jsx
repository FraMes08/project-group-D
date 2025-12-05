import './Footer.css';
import logodefinitivo from "../../assets/logodefinitivo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
          <div className="logodefinitivo2">
                  <img src={logodefinitivo} alt="logo" />
                </div>
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
