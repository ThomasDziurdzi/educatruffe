// Hook
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContextProvider } from "../../context/reservationContext";
import { useAuth } from "../../components/context/AuthContext";

// Components
import Button from "../../components/Button/Button";
import Commentaire from "../../components/Commentaire/Commentaire";
import Messagerie from "../../components/Messagerie/Messagerie";
import Services from "../../components/Services/Services";
import Historique from "../../components/AdminHistorique/Historique";
import AdminNewsletter from "../../components/AdminNewsletter/AdminNewsletter";
import AdminCalendar from "../../components/Calendar/AdminCalendar";
import ListeUserAdmin from "../../components/ListeUserAdmin/ListeUserAdmin";

// CSS
import "./Admin.css";

function Admin() {
  const [activeComponent, setActiveComponent] = useState("calendrier");

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isAdmin) {
      navigate("/");
    }
  }, [auth, navigate]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };
  return (
    <ReservationContextProvider>
      <div className="admin__container">
        <div className="admin__box">
          <div className="admin__left">
            <Button
              text="Calendrier"
              onClick={() => handleButtonClick("calendrier")}
            />
            <Button
              text="Commentaire"
              onClick={() => handleButtonClick("commentaire")}
            />
            <Button
              text="Messagerie"
              onClick={() => handleButtonClick("messagerie")}
            />
            <Button
              text="Services"
              onClick={() => handleButtonClick("services")}
            />
            <Button
              text="Newsletter"
              onClick={() => handleButtonClick("newsletter")}
            />
            <Button
              text="Historique"
              onClick={() => handleButtonClick("historique")}
            />
            <Button
              text="Repertoire Client"
              onClick={() => handleButtonClick("clientListe")}
            />
          </div>
          <div className="admin__box1">
            <div className="admin__border">{null}</div>
          </div>
          <div className="admin__right">
            {activeComponent === "calendrier" && <AdminCalendar />}{" "}
            {activeComponent === "commentaire" && <Commentaire />}{" "}
            {activeComponent === "services" && <Services />}{" "}
            {activeComponent === "messagerie" && <Messagerie />}{" "}
            {activeComponent === "newsletter" && <AdminNewsletter />}{" "}
            {activeComponent === "historique" && <Historique />}{" "}
            {activeComponent === "clientListe" && <ListeUserAdmin />}{" "}
            {/* Afficher le composant en fonction de l'état actif */}
          </div>
        </div>
      </div>
    </ReservationContextProvider>
  );
}

export default Admin;
