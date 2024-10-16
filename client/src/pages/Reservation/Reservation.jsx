import axios from "axios";
import { useState, useEffect } from "react";
// import { useAuth } from "../../components/context/AuthContext";
import Adress from "../../components/Adress/Adress";
import Calendar from "../../components/Calendar/Calendar";
import "../Service/Service";
import { ReservationContextProvider } from "../../context/reservationContext";

function Reservation() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [reservations, setReservations] = useState([]);
  // const { auth } = useAuth();
  function reservationsFetch() {
    axios
      .get("http://localhost:3310/api/seance")
      .then((response) => {
        setReservations(response.data);
        // console.info(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }

  useEffect(() => {
    reservationsFetch();
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReservationContextProvider>
      <div className="reservation__container">
        <h1>Bienvenue sur la page des réservations</h1>
        <div className="reservation__box">
          {/* {console.info(auth.userId)} */}
          <Adress />
          {windowWidth >= 640 ? (
            <Calendar reservations={reservations} />
          ) : (
            <Calendar reservations={reservations} />
          )}
        </div>
      </div>
    </ReservationContextProvider>
  );
}

export default Reservation;
