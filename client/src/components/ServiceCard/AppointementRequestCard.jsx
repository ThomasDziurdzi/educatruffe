import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "../Button/Button";
import AppointementRequestForm from "../Form/AppointementRequestForm";
import sherlock from "../../assets/images/sherlock.jpg";
import "./ServiceCard.css";

function AppointementRequestCard() {
  const [modal, setModal] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const { auth } = useAuth();

  const handleModal = () => {
    if (!auth) {
      setShowLoginMessage(true);
      return;
    }
    setModal(!modal);
  };

  return (
    <div className="serviceCard">
      <img
        src={sherlock}
        alt="demande de contact"
        className="serviceCard__image"
      />
      <div className="serviceCard__content">
        <h2 className="serviceCard__title">Rendez-vous personnalisé</h2>
        {showLoginMessage && (
          <p className="serviceCard__loginMessage">
            Veuillez vous connecter pour effectuer une réservation.
          </p>
        )}
        <p className="serviceCard__description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. eaque
          necessitatibus?
        </p>
      </div>

      <div className="serviceCard__footer">
        <div className="serviceCard__service">
          <p className="serviceCard__duration">4 heures</p>
        </div>
        <Button text="Réserver" onClick={handleModal} />
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button type="button" className="modal-close" onClick={handleModal}>
              X
            </button>
            <AppointementRequestForm handleModal={handleModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointementRequestCard;
