import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./CommentaireSeance.css";

function CommentaireSeance({ item, onClose, onUpdate }) {
  const [commentaire, setCommentaire] = useState("");
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/seanceReport/${item.id}`
        );
        if (response.status === 200 && response.data) {
          setCommentaire(response.data.report);
          setReportId(response.data.id);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du rapport:", error);
      }
    };

    fetchReport();
  }, [item.id]);

  const handleCommentChange = (e) => {
    setCommentaire(e.target.value);
  };

  const handleSaveReport = async () => {
    try {
      const reportData = {
        dogId: item.dogId,
        seanceId: item.id,
        report: commentaire,
      };

      if (reportId) {
        const response = await axios.put(
          `http://localhost:3310/api/seanceReport/${reportId}`,
          reportData
        );

        if (response.status === 200) {
          console.info("Rapport mis à jour avec succès");
        }
      } else {
        const response = await axios.post(
          "http://localhost:3310/api/seanceReport",
          reportData
        );

        if (response.status === 200) {
          console.info("Rapport créé avec succès");
          setReportId(response.data.id);
        }
      }

      onClose();
      onUpdate();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du rapport:", error);
    }
  };

  return (
    <div className="historique__edit">
      <h3>{reportId ? "Modifier" : "Ajouter"} le commentaire</h3>
      <textarea
        name="commentaire"
        value={commentaire}
        onChange={handleCommentChange}
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ddd",
        }}
      />
      <button className="btn__save" type="button" onClick={handleSaveReport}>
        {reportId ? "Mettre à jour" : "Sauvegarder"}
      </button>
      <button className="btn__close" type="button" onClick={onClose}>
        Fermer
      </button>
    </div>
  );
}

CommentaireSeance.propTypes = {
  item: PropTypes.shape({
    dogId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentaireSeance;
