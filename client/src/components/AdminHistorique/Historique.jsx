import { useState, useEffect } from "react";
import axios from "axios";
import CommentaireSeance from "./CommentaireSeance";
import "./Historique.css";

function Historique() {
  const [historique, setHistorique] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);

  async function seanceFetch() {
    try {
      const response = await axios.get(
        "http://localhost:3310/api/seance/taken"
      );
      if (response.status === 200) {
        console.info("Fetch des séances réussi");
        const seances = response.data;

        const seancesWithReports = await Promise.all(
          seances.map(async (seance) => {
            try {
              const reportResponse = await axios.get(
                `http://localhost:3310/api/seanceReport/${seance.id}`
              );
              if (reportResponse.status === 200 && reportResponse.data) {
                return { ...seance, commentaire: reportResponse.data.report };
              }
            } catch (error) {
              console.error(
                `Erreur lors du fetch du rapport pour la séance ${seance.id}:`,
                error
              );
            }
            return seance;
          })
        );

        setHistorique(seancesWithReports);
      }
    } catch (error) {
      console.error("Erreur lors du fetch des séances:", error);
    }
  }

  useEffect(() => {
    seanceFetch();
  }, []);

  const event = new Date(Date.now());
  let fullDate = event.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  fullDate = fullDate.replace(" à ", " ");

  function dateCompare(date1, date2) {
    return new Date(date2) > new Date(date1);
  }

  const filteredHistorique = historique.filter((seance) => {
    const searchLowerCase = searchTerm.toLowerCase();
    return (
      seance.dogName.toLowerCase().includes(searchLowerCase) ||
      seance.serviceName.toLowerCase().includes(searchLowerCase) ||
      `${seance.firstName} ${seance.lastName}`
        .toLowerCase()
        .includes(searchLowerCase)
    );
  });

  const handleCommentUpdate = () => {
    seanceFetch();
  };

  return (
    <div className="historique__container">
      <h2>Historiques des séances</h2>
      <input
        type="text"
        placeholder="Rechercher "
        className="historique__search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="historique__table">
        <thead>
          <tr className="historique__header">
            <th>Date</th>
            <th>Chien</th>
            <th>Service</th>
            <th>Nom Maître</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistorique.length > 0 ? (
            filteredHistorique.map((seance) => {
              if (dateCompare(seance.date.concat(" ", seance.hour), fullDate)) {
                return (
                  <tr className="historique__row" key={seance.id}>
                    <td>
                      {seance.date} {seance.hour}
                    </td>
                    <td>{seance.dogName}</td>
                    <td>{seance.serviceName}</td>
                    <td>
                      {seance.firstName} {seance.lastName}
                    </td>
                    <td>{seance.commentaire || "Aucun commentaire"}</td>
                    <td>
                      <button
                        type="button"
                        className="btn__edit"
                        onClick={() => setSelectedComment(seance)}
                      >
                        Commentaire
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })
          ) : (
            <tr>
              <td colSpan="6">Aucun historique trouvé</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedComment && (
        <CommentaireSeance
          item={selectedComment}
          onClose={() => setSelectedComment(null)}
          onUpdate={handleCommentUpdate}
        />
      )}
    </div>
  );
}

export default Historique;
