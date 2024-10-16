import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import ComUser from "../ComUser/ComUser";

import "./SeanceCard.css";

function SeanceCard({ seance, service, aVenir }) {
  const formattedDate = new Date(seance.date).toLocaleDateString();
  const [comModal, setComModal] = useState(false);

  const handleComModal = () => {
    setComModal(!comModal);
  };

  return (
    <div className="seanceCard__container">
      <div className="seanceCard__content">
        <h2 className="seanceCard__title">{service.serviceName}</h2>
        <p className="seanceCard__description">{service.description}</p>
        <p className="seanceCard_time">Le {formattedDate}</p>
      </div>
      <div className="seanceCard__footer">
        <div className="seanceCard__service">
          <span className="seanceCard__price">{service.servicePrice} €</span>
        </div>
        {aVenir === true ? (
          <Button text="Annuler" />
        ) : (
          <div>
            {/* onClick={() => handleModal()} est écrit ainsi pour être sûre qu'il ne se lance pas tout seul au chargement de la page en même temps que le returne, c'est une sécurité de  l'écrire ainsi */}

            <Button text="commentaire" onClick={() => handleComModal()} />
            {/* && test si les 2 conditions sont vraies sans aucune condition si c'est faux */}
            {comModal && (
              <ComUser handleComModal={handleComModal} seance={seance} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

SeanceCard.propTypes = {
  aVenir: PropTypes.bool.isRequired,
  seance: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  service: PropTypes.shape({
    image: PropTypes.string.isRequired,
    serviceName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    servicePrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default SeanceCard;
