import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "../Button/Button";
import "./UserForm.css";

function UserForm({ userId }) {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setInitialData(response.data);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des informations");
        console.error(err);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (JSON.stringify(userData) === JSON.stringify(initialData)) {
      setSuccessMessage("Vous n'avez effectué aucune modification");
      return;
    }

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/user/${userId}`, userData)
      .then((response) => {
        console.info("Informations modifiées avec succès", response);
        setSuccessMessage("Vos informations ont été modifiées avec succès !");
        setError(null);
        setInitialData(userData);
      })
      .catch((err) => {
        setError("Erreur lors de la modification des informations");
        setSuccessMessage(null);
        console.error(err);
      });
  };

  return (
    <section className="userform__container">
      <p>Modifier vos informations personnelles</p>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="usercontact__form">
          <div className="usercontact__name">
            <div className="usercontact__form-input">
              <label htmlFor="firstname">Prénom:</label>
              <input
                className="usercontact__input"
                type="text"
                id="firstname"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                placeholder="Prénom"
                required
              />
            </div>

            <div className="usercontact__form-input">
              <label htmlFor="lastname">Nom:</label>
              <input
                className="usercontact__input"
                type="text"
                id="lastname"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                placeholder="Nom"
                required
              />
            </div>
          </div>
          <div className="usercontact__form-input">
            <label htmlFor="email">E-mail:</label>
            <input
              className="usercontact__input"
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              required
            />
          </div>
          <div className="usercontact__form-input">
            <label htmlFor="phoneNumber">Téléphone:</label>
            <input
              className="usercontact__input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              placeholder="Votre numéro de téléphone ici"
              required
            />
          </div>
          <div className="usercontact__form-input">
            <label htmlFor="address">Adresse:</label>
            <textarea
              className="usercontact__input"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              placeholder="Votre adresse ici"
              required
            />
          </div>
          <Button type="submit" text="Valider" />
        </div>
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </section>
  );
}

UserForm.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default UserForm;
