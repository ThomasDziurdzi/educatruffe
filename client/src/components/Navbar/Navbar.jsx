import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../Login/Login";
import frame from "../../assets/images/frame.png";
import { useAuth } from "../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { auth, logout } = useAuth();

  const handleModal = () => {
    if (modal === true) {
      setAnimateOut(true);
      setTimeout(() => {
        setModal(!modal);
        setAnimateOut(false);
      }, 400);
    } else {
      setModal(!modal);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <nav className="navbar">
      <button
        type="button"
        className={`navbar__burger-btn ${isNavbarOpen ? "open" : ""}`}
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        aria-label={isNavbarOpen ? "Close menu" : "Open menu"}
      >
        <span className="navbar__burger-bar" />
        <span className="navbar__burger-bar" />
        <span className="navbar__burger-bar" />
      </button>

      {isNavbarOpen && (
        <div className="overlay-nav__container">
          <ul className="overlay-nav__list">
            <li className="overlay-nav__list-item">
              <Link to="/service" onClick={closeNavbar}>
                Mes services
              </Link>
            </li>
            <li className="overlay-nav__list-item">
              <Link to="/about" onClick={closeNavbar}>
                À propos
              </Link>
            </li>
            <li className="overlay-nav__list-item">
              <Link to="/contact" onClick={closeNavbar}>
                Contact
              </Link>
            </li>
            {auth && (
              <li className="overlay-nav__list-item">
                {auth.isAdmin ? (
                  <Link to="/admin" onClick={closeNavbar}>
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/user" onClick={closeNavbar}>
                    Mon Compte
                  </Link>
                )}
              </li>
            )}
          </ul>
          <button
            type="button"
            className="overlay-nav__button"
            onClick={() => {
              closeNavbar();
              if (auth) {
                handleLogout();
              } else {
                handleModal();
              }
            }}
          >
            {auth ? `Déconnexion` : "Connexion"}
            <img src={frame} alt="double chevron" />
          </button>
        </div>
      )}

      <ul className="classic-nav">
        <li className="classic-nav__item">
          <Link to="/service">Mes services</Link>
        </li>
        <li className="classic-nav__item">
          <Link to="/about">À propos</Link>
        </li>
        <li className="classic-nav__item">
          <Link to="/contact">Contact</Link>
        </li>
        {auth && (
          <li className="classic-nav__item">
            {auth.isAdmin ? (
              <Link to="/admin">Dashboard</Link>
            ) : (
              <Link to="/user">Mon Compte</Link>
            )}
          </li>
        )}
      </ul>
      <button
        type="button"
        className="classic-nav__button"
        onClick={auth ? handleLogout : handleModal}
      >
        {auth ? `Déconnexion` : "Connexion"}
        <img src={frame} alt="double chevron" />
      </button>
      {modal && <Login handleModal={handleModal} animateOut={animateOut} />}
    </nav>
  );
}

export default Navbar;
