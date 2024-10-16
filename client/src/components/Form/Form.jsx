import { useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import "./Form.css";

function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3310/api/contact", {
        firstName,
        lastName,
        email,
        message,
      });

      setSuccessMessage(response.data.message);
      // Réinitialiser le formulaire
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de l'envoi du message.");
      console.error("Erreur lors de l'envoi du message:", error);
    }
  };

  return (
    <section className="form__container">
      <p>Saisissez vos informations personnelles</p>
      <form onSubmit={handleSubmit}>
        <div className="contact__form">
          <div className="contact__name">
            <div className="contact__form-input">
              <label htmlFor="firstName">Prénom:</label>
              <input
                className="contact__input"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="contact__form-input">
              <label htmlFor="lastName">Nom:</label>
              <input
                className="contact__input"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="contact__form-input">
            <label htmlFor="email">E-mail:</label>
            <input
              className="contact__input"
              type="email"
              id="email"
              name="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="contact__form-input">
            <label htmlFor="message">Message:</label>
            <textarea
              className="contact__input message"
              id="message"
              name="message"
              rows="5"
              placeholder="Votre message ici"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button text="Valider" type="submit" />
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </section>
  );
}

export default Form;
