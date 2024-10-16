import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Logo from "../svg/Logo";
import loginImage from "../../assets/images/login_image.png";
import "./Register.css";

/**
 * Ce composant gère l'inscription des nouveaux utilisateurs en recueillant les informations
 * nécessaires via un formulaire. Il effectue ensuite une requête POST pour créer un nouvel utilisateur
 * dans la base de données. Si les mots de passe ne correspondent pas, l'inscription est bloquée
 * et un message d'erreur est affiché.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {function} props.modalRef - Référence vers l'élément modal pour la détection des clics en dehors.
 * @param {function} props.switchToLogin - Fonction permettant de basculer vers le composant de connexion.
 *
 */

export default function Register({ modalRef, switchToLogin }) {
  // Références et hooks pour les champs du formulaire
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  /**
   * Fonction de gestion du formulaire d'inscription.
   * Effectue une validation pour vérifier si les mots de passe correspondent avant d'envoyer
   * une requête POST pour créer un nouvel utilisateur.
   *
   * @param {Event} event - L'événement de soumission du formulaire.
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifie si les mots de passe correspondent
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Envoie une requête POST pour créer un utilisateur
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
          password,
          firstname,
          lastname,
          address,
          phone,
        }),
      });

      // Si l'inscription est réussie, retourne à l'écran de connexion
      if (response.status === 201) {
        switchToLogin();
      } else {
        const data = await response.json();
        console.info("Erreur:", data);
      }
    } catch (err) {
      console.error("Erreur de requête :", err);
    }
  };

  return (
    <div className="register modal" ref={modalRef}>
      <form className="register__left" onSubmit={handleSubmit}>
        <div className="left__logo">
          <Logo width={75} height={75} className="logo" />
          <h1>Éducatruffe</h1>
        </div>
        <h2>Bienvenue</h2>

        <div className="left__mail">
          <label htmlFor="email" className="visually__hidden">
            Adresse e-mail
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            size="30"
            placeholder="Adresse e-mail*"
            required
          />
        </div>

        <div className="left__mail">
          <label htmlFor="password" className="visually__hidden">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            size="30"
            placeholder="Mot de passe*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <label htmlFor="confirm-password" className="visually__hidden">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirm-password"
            size="30"
            placeholder="Confirmer le mot de passe*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {password === confirmPassword ? "✅" : "❌"}
        </div>

        <div className="left__mail--dual">
          <input
            type="text"
            id="firstName"
            size="30"
            placeholder="Nom*"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            id="lastName"
            size="30"
            placeholder="Prénom*"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <input
            type="text"
            id="address"
            size="30"
            placeholder="Adresse*"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="left__mail">
          <input
            type="text"
            id="phone"
            size="30"
            placeholder="Numéro de téléphone*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register__button--mobile">
          Continuer
        </button>
      </form>
      <section className="register__right">
        <img src={loginImage} alt="dressage" />
      </section>
    </div>
  );
}

Register.propTypes = {
  modalRef: PropTypes.func.isRequired,
  switchToLogin: PropTypes.func.isRequired,
};
