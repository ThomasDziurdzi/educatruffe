import PropTypes from "prop-types";
import { createContext, useContext, useState, useMemo, useEffect } from "react";

// Création du contexte d'authentification
const AuthContext = createContext();

function AuthProvider({ children }) {
  // Initialisation de l'état auth avec les valeurs stockées dans localStorage si elles existent
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("authUserId");
    const isAdmin = localStorage.getItem("isAdmin") === "true"; // Conversion de la chaîne en booléen
    // Si un token et un userId existent, retourne un objet auth, sinon retourne null
    return token && userId ? { token, userId, isAdmin } : null;
  });

  /**
   * Effet qui surveille les changements dans l'état auth.
   * Si auth est défini, les informations d'authentification sont stockées dans localStorage.
   * Sinon, elles sont supprimées.
   */
  useEffect(() => {
    if (auth?.token) {
      // Stockage des informations dans localStorage
      localStorage.setItem("authToken", auth.token);
      localStorage.setItem("authUserId", auth.userId);
      localStorage.setItem("isAdmin", auth.isAdmin);
    } else {
      // Suppression des informations si l'utilisateur est déconnecté
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUserId");
      localStorage.removeItem("isAdmin");
    }
  }, [auth]); // L'effet est déclenché chaque fois que auth change

  /**
   * Fonction pour déconnecter l'utilisateur en réinitialisant l'état auth.
   */
  const logout = () => {
    setAuth(null);
  };

  // Utilisation de useMemo pour mémoriser la valeur du contexte à chaque fois que auth change
  const value = useMemo(() => ({ auth, setAuth, logout }), [auth]);

  // Retourne le fournisseur du contexte d'authentification avec les enfants comme contenu
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Vérification du type des props pour AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children doit être un élément React
};

// Exportation du composant AuthProvider
export { AuthProvider };

/**
 * Hook personnalisé pour accéder au contexte d'authentification.
 */

function useAuth() {
  const context = useContext(AuthContext); // Récupère le contexte d'authentification
  if (context === undefined) {
    // Vérifie si le hook est utilisé dans un AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Exportation du hook useAuth
export { useAuth };
