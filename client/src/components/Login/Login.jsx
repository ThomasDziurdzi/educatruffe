import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../svg/Logo";
import loginImage from "../../assets/images/login_image.png";
import Register from "../Register/Register";
import "./Login.css";

/**
 * Composant Login permettant à l'utilisateur de se connecter ou de s'inscrire.
 * Affiche un formulaire de connexion ou, si demandé, un formulaire d'inscription.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {Function} props.handleModal - Fonction permettant de fermer la modal de connexion.
 * @param {boolean} props.animateOut - Booléen pour gérer l'animation de sortie du composant.
 *
 */
function Login({ handleModal, animateOut }) {
  // État pour savoir si l'on affiche le formulaire de connexion (0) ou d'inscription (1)
  const [register, setRegister] = useState(0);

  // Références pour accéder aux valeurs des champs email et mot de passe
  const emailRef = useRef();
  const passwordRef = useRef();

  // Récupération de setAuth depuis le contexte d'authentification
  const { setAuth } = useAuth();

  // Hook pour naviguer entre différentes pages
  const navigate = useNavigate();

  // Référence pour la modal
  const modalRef = useRef();

  // Hook pour accéder à l'emplacement actuel (route)
  const location = useLocation();

  /**
   * Effet qui ferme la modal si on clique à l'extérieur de celle-ci.
   */
  useEffect(() => {
    function handleClickOutside(event) {
      // Si on clique en dehors de la modal, on ferme celle-ci
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleModal]);

  /**
   * Effet qui ferme la modal si l'utilisateur navigue vers "/user" ou "/admin".
   */
  useEffect(() => {
    if (location.pathname === "/user" || location.pathname === "/admin") {
      handleModal();
    }
  }, [location.pathname, handleModal]);

  /**
   * Gère la soumission du formulaire de connexion.
   * Envoie une requête POST à l'API pour authentifier l'utilisateur.
   * Si l'authentification réussit, les informations sont stockées et l'utilisateur est redirigé.
   *
   * @param {Event} event - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Requête POST à l'API pour l'authentification
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );

      // Si la réponse est réussie, on stocke les informations et on redirige
      if (response.status === 200) {
        const { token, user } = response.data;
        setAuth({ userId: user.id, token, isAdmin: user.isAdmin });
        // Redirige vers /admin si c'est un admin, sinon vers /user
        navigate(user.isAdmin ? "/admin" : "/user");
      } else {
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Change l'état pour retourner à l'écran de connexion.
   */
  const switchToLogin = () => {
    setRegister(0);
  };

  return (
    <div className={`login__global ${animateOut ? "login__global--out" : ""}`}>
      {register === 0 ? (
        <div
          className={`login modal ${animateOut ? "login--out" : ""}`}
          ref={modalRef}
        >
          <section className="login__left">
            <div className="left__logo">
              <Logo width={75} height={75} className="logo" />
              <h1>Éducatruffe</h1>
            </div>
            <h2>
              Bienvenue à <br />
              nouveau
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="left__mail">
                <label htmlFor="email" className="visually__hidden">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  size="30"
                  placeholder="Adresse e-mail"
                  ref={emailRef}
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
                  placeholder="Mot de passe"
                  ref={passwordRef}
                  required
                />
              </div>
              <div className="left__button">
                <button className="button__continuer" type="submit">
                  Connexion
                </button>
              </div>
            </form>
            <div className="left__inscription">
              <p>
                Vous n'avez pas de compte ?
                <div className="inscription__button">
                  <button type="button" onClick={() => setRegister(1)}>
                    Inscription
                  </button>
                </div>
              </p>
            </div>
          </section>
          <section className="login__right">
            <img src={loginImage} alt="illustration de connexion" />
          </section>
        </div>
      ) : (
        <Register modalRef={modalRef} switchToLogin={switchToLogin} />
      )}
    </div>
  );
}

Login.propTypes = {
  handleModal: PropTypes.func.isRequired,
  animateOut: PropTypes.bool.isRequired,
};

export default Login;
