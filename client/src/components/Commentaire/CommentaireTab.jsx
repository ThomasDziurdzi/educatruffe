import PropTypes from "prop-types";
import axios from "axios";
// import { useState } from "react";
import "./CommentaireTab.css";

function CommentaireTab({
  lastName,
  firstName,
  text,
  rating,
  id,
  fetchCommentaire,
  userId,
  serviceId,
  approved,
}) {
  const onValidate = async () => {
    // on récupere tous les commentaires avec toutes leurs valeurs puis on fait un map sur toute la liste en passant leurs props dont approved
    // créer un objet identique à celui éxistant sauf approved que l'on remplace par 1
    // faire une requete put avec cette adresse : `http://localhost:3310/api/commentaire/${id}`

    const validatedCommentaire = {
      id,
      serviceId,
      text,
      userId,
      rating,
      approved: 1,
      firstName,
      lastName,
    };

    try {
      const response = await axios.put(
        `http://localhost:3310/api/commentaire/${id}`,
        validatedCommentaire
      );
      console.info("reponse du serveur:", response.data);
    } catch (error) {
      console.error("Erreur lors de la modification du commentaire:", error);
    }
    fetchCommentaire();
  };

  const onAnnuler = async () => {
    // une fois le commentaire valider je veux que le boutton se transforme en annuler
    // remplacer approved qui et de 1 a 0

    const annulerCommentaire = {
      id,
      serviceId,
      text,
      userId,
      rating,
      approved: 0,
      firstName,
      lastName,
    };
    try {
      const response = await axios.put(
        `http://localhost:3310/api/commentaire/${id}`,
        annulerCommentaire
      );
      console.info("reponse du serveur:", response.data);
    } catch (error) {
      console.error("Erreur lors de la modification du commentaire:", error);
    }
    fetchCommentaire();
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3310/api/commentaire/${id}`
      );

      if (response.status === 200) {
        console.info("delete a fonctionné");
      }
    } catch (error) {
      console.error("erreur lors du delete: ", error);
    }
    fetchCommentaire();
  };

  return (
    <div className="commentaire-tab">
      {/* {console.log(approved)} */}
      <div className="commentaire__name">
        <p>{`${firstName} ${lastName}`}</p>
      </div>
      <div className="commentaire__text">
        <p>{text}</p>
      </div>
      <div className="comment-rating">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <span
            key={starIndex}
            className={`star ${rating >= starIndex ? "filled" : ""}`}
            aria-label={`Rate ${starIndex} star${starIndex > 1 ? "s" : ""}`}
          >
            ★
          </span>
        ))}
      </div>
      <div className="comment-actions">
        {approved === 0 ? (
          <button
            type="button"
            className="btnValidate"
            onClick={() => onValidate()}
          >
            Valider
          </button>
        ) : (
          <button
            type="button"
            className="btnAnnuler"
            onClick={() => onAnnuler()}
          >
            Annuler
          </button>
        )}
        <button type="button" className="btnDelete" onClick={() => onDelete()}>
          Supprimer
        </button>
      </div>
    </div>
  );
}

CommentaireTab.propTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  serviceId: PropTypes.number.isRequired,
  fetchCommentaire: PropTypes.func.isRequired,
  approved: PropTypes.number.isRequired,
};

export default CommentaireTab;
