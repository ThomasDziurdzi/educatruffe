import { useState } from "react";
import axios from "axios";
import "./Newsletter.css";
import whiteDog from "../../assets/images/whiteDog.png";
import Mail from "../svg/Mail";
import stamp from "../../assets/images/stamp.png";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' ou 'error'

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Veuillez entrer une adresse email.");
      setMessageType("error");
      return;
    }

    try {
      // Envoie des données au backend avec le bon format
      const response = await axios.post(
        "http://localhost:3310/api/newsletterUser",
        { userEmail: email }
      );

      if (response.status === 201) {
        setMessage("Inscription réussie !");
        setMessageType("success");
        setEmail("");
      } else {
        setMessage("Erreur lors de l'inscription, veuillez réessayer.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Une erreur s'est produite.");
      setMessageType("error");
    }
  };

  return (
    <div className="newsletter__container">
      <Mail />
      <div className="newsletter__left">
        <img src={stamp} alt="" className="stamp" />
        <h2 className="newsletter__title">
          Événements, articles ? Ne ratez rien !
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          fringilla mattis. Sed in dolor sed orci sodales pulvinar. Etiam non mi
          et quam convallis ultrices.{" "}
        </p>
        <div className="newsletter__emailField">
          <input
            type="text"
            className="newsletter__input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
          />
          <button type="button" onClick={handleSubmit}>
            Souscrire
          </button>
        </div>
        {message && (
          <div
            className={`message ${messageType === "success" ? "message--success" : "message--error"}`}
          >
            {message}
          </div>
        )}
      </div>
      <div className="newsletter__right">
        <img src={whiteDog} alt="chien blanc" />
      </div>
    </div>
  );
}

export default Newsletter;
