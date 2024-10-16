import { useRef, useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Button from "../Button/Button";
import "./Form.css";

function AppointementRequestForm({ handleModal }) {
  const { auth } = useAuth();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const rdvModalRef = useRef();

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));

    function handleClickOutside(event) {
      if (rdvModalRef.current && !rdvModalRef.current.contains(event.target)) {
        handleModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth || !auth.userId) {
      setErrorMessage("Vous devez être connecté pour envoyer une demande.");
      return;
    }

    const requestData = {
      message,
      userId: auth.userId,
      date,
    };

    try {
      const response = await axios.post(
        "http://localhost:3310/api/appointmentRequest",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        console.info("Votre demande a été envoyée avec succès.");
        setMessage("");
        setDate(new Date().toISOString().slice(0, 10));
        setErrorMessage("");

        setTimeout(() => {
          handleModal();
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande :", error);
      setErrorMessage("Erreur lors de l'envoi de la demande.");
    }
    handleModal();
  };

  return (
    <div className="contact__container">
      <section ref={rdvModalRef} className="form__container">
        <p>Saisissez votre demande</p>
        <form onSubmit={handleSubmit}>
          <div className="contact__form">
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </section>
    </div>
  );
}

AppointementRequestForm.propTypes = {
  handleModal: propTypes.func.isRequired,
};

export default AppointementRequestForm;
