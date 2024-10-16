import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ServiceCard.css";
import Button from "../Button/Button";

function ServiceCard({
  image,
  serviceName,
  description,
  servicePrice,
  duration,
  serviceId,
}) {
  const { auth } = useAuth();
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Affiche un message si non connecté

  const handleReservationClick = (e) => {
    if (!auth) {
      e.preventDefault();
      setShowLoginMessage(true); // Affiche le message de connexion
    }
  };

  return (
    <div className="serviceCard">
      <img
        src={`http://localhost:3310${image}`}
        alt={serviceName}
        className="serviceCard__image"
      />
      <div className="serviceCard__content">
        <h2 className="serviceCard__title">{serviceName}</h2>
        {showLoginMessage && (
          <p className="serviceCard__loginMessage">
            Veuillez vous connecter pour effectuer une réservation.
          </p>
        )}
        <p className="serviceCard__description">{description}</p>
      </div>
      <div className="serviceCard__footer">
        <div className="serviceCard__service">
          <p className="serviceCard__duration">{duration} / </p>
          <span className="serviceCard__price">{servicePrice} €</span>
        </div>
        <Link to={`/reservation/${serviceId}`} onClick={handleReservationClick}>
          <Button text="Reserver" />
        </Link>
      </div>
    </div>
  );
}

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  serviceId: PropTypes.number.isRequired,
  servicePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  duration: PropTypes.string.isRequired,
};

export default ServiceCard;
