import axios from "axios";
import { useState, useEffect } from "react";
import "./VosAvis.css";
import Zigzag from "../svg/Zigzag";
import EtoileAvis1 from "../svg/EtoileAvis1";
import EtoileAvis3 from "../svg/EtoileAvis3";

function VosAvis() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentaireData, setCommentaireData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/commentaire")
      .then((response) => {
        const approvedComments = response.data.filter(
          (comment) => comment.approved === 1
        );
        setCommentaireData(approvedComments);
        console.info("Données récupérées:", approvedComments);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des avis.");
        console.error("Erreur:", err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % commentaireData.length);
    }, 8000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, [commentaireData.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % commentaireData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? commentaireData.length - 1 : prevIndex - 1
    );
  };

  // étoiles en texte en fonction de la note
  const renderStars = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

  if (commentaireData.length === 0) {
    return <div>Chargement des avis...</div>;
  }

  const { firstName, lastName, text, rating } = commentaireData[currentIndex];

  return (
    <div className="avis">
      <h1 className="avis__title">VOS AVIS</h1>
      <p className="avis__paragraph">
        Personne n'est mieux que vous pour parler de ce que vous aimez !
      </p>
      <div className="avis__star1">
        <EtoileAvis1 />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="avis__article">
        <button
          type="button"
          className="avis__button avis__button--prev"
          onClick={handlePrev}
        >
          ‹
        </button>

        <div className="avis__describe">
          <h2 className="avis__describe--h2">
            {firstName} {lastName}
          </h2>
          <div className="avis__star">{renderStars(rating)}</div>
          <p className="avis__describe--p">{text}</p>
        </div>

        <button
          type="button"
          className="avis__button avis__button--next"
          onClick={handleNext}
        >
          ›
        </button>
      </div>
      <div className="avis__star2--div">
        <EtoileAvis3 className="avis__star2" />
      </div>
      <div className="avis__zigzag--div">
        <Zigzag className="avis__zigzag" />
      </div>
    </div>
  );
}

export default VosAvis;
