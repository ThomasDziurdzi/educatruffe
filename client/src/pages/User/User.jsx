import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext";
import UserNavbar from "../../components/UserNavBar/UserNavBar";
import Seances from "../../components/Seances/Seances";
import UserForm from "../../components/UserForm/UserForm";
import DogCard from "../../components/DogCard/DogCard";
import CalendarSvg from "../../components/svg/CalendarSvg";
import DogSvg from "../../components/svg/DogSvg";
import AvatarSvg from "../../components/svg/AvatarSvg";
import "./User.css";

function User() {
  const [activeComponent, setActiveComponent] = useState("dogs");
  const [dogs, setDogs] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAdmin) {
      navigate("/admin");
    }
  }, [auth, navigate]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dogs/${auth.userId}`
        );
        setDogs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des chiens :", error);
      }
    };

    if (auth?.userId) {
      fetchDogs();
    }
  }, [auth]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "seance":
        return <Seances userId={auth.userId} />;
      case "dogs":
        return <DogCard userId={auth.userId} dogs={dogs} />;
      case "modify":
        return <UserForm userId={auth.userId} />;
      default:
        return null;
    }
  };

  return (
    <div className="user__container">
      <div className="user__box">
        <div className="user__svg-icons">
          <CalendarSvg
            onClick={() => handleButtonClick("seance")}
            className="svg-button"
          />
          <DogSvg
            onClick={() => handleButtonClick("dogs")}
            className="svg-button"
          />
          <AvatarSvg
            onClick={() => handleButtonClick("modify")}
            className="svg-button"
          />
        </div>
        <UserNavbar onButtonClick={handleButtonClick} />
        {renderComponent()}
      </div>
    </div>
  );
}

export default User;
