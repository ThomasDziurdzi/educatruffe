// Hooks
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// CSS
import "./ListeUserAdmin.css";

function ListeUserAdmin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour le terme de recherche
  const containerRef = useRef(null);

  // Récupérer les utilisateurs via l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/user/");
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    fetchUsers();
  }, []);

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="repertoire">
      <h2 className="repertoire__title">Répertoire Client</h2>

      <input
        type="text"
        className="repertoire__search"
        placeholder="Rechercher "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="repertoire__list" ref={containerRef}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="repertoire__user">
              <p className="repertoire__info">
                <strong>Nom :</strong> {user.firstname} {user.lastname}
              </p>
              <p className="repertoire__info">
                <strong>Mail :</strong> {user.email}
              </p>
              <p className="repertoire__info">
                <strong>Téléphone :</strong> {user.phoneNumber}
              </p>
            </div>
          ))
        ) : (
          <p className="repertoire__no-messages">Aucun client trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default ListeUserAdmin;
