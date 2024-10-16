import { useState, useEffect } from "react";
import axios from "axios";
import CommentaireTab from "./CommentaireTab";
import "./Commentaire.css";

function Commentaire() {
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [error, setError] = useState(null);

  const handleCommentClick = (comment) => {
    setSelectedComment(comment);
  };

  const fetchCommentaire = () => {
    axios
      .get(`http://localhost:3310/api/commentaire`)
      .then((response) => {
        setCommentaires(response.data);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération");
        console.error("Erreur:", err);
      });
  };

  useEffect(() => {
    fetchCommentaire();
  }, []);

  return (
    <div className="commentaire__container">
      {console.info(commentaires)}
      <div className="commentaire__titre">
        <h2>Commentaires</h2>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="container__commentaire">
        {commentaires.map((commentaire) => (
          <div
            key={commentaire.id}
            role="button"
            tabIndex={0}
            aria-label="text"
            onClick={() =>
              // handleCommentClick( commentaire.id, commentaire.firstName, commentaire.lastName, commentaire.text )
              handleCommentClick(commentaire)
            }
            className="commentaire-tab-container"
            onKeyDown={() => {}}
          >
            <CommentaireTab
              id={commentaire.id}
              firstName={commentaire.firstName}
              lastName={commentaire.lastName}
              text={commentaire.text}
              rating={commentaire.rating}
              approved={commentaire.approved}
              userId={commentaire.userId}
              serviceId={commentaire.serviceId}
              fetchCommentaire={fetchCommentaire}
            />
          </div>
        ))}
      </div>
      <div className="commentaire__detail">
        <h2>Détails du commentaire</h2>
      </div>
      {selectedComment && (
        <div className="selected-comment">
          <p>
            <strong>
              {selectedComment.firstName} {selectedComment.lastName}
            </strong>
          </p>
          <p>{selectedComment.text}</p>
        </div>
      )}
    </div>
  );
}

export default Commentaire;
