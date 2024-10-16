import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const defaultReservationContext = {
  reservation: [],
  setReservation: () => {},
  taken: [],
  setTaken: () => {},
};

const ReservationContext = createContext(defaultReservationContext);

function ReservationContextProvider({ children }) {
  const [reservation, setReservation] = useState(
    defaultReservationContext.reservation
  );
  const [taken, setTaken] = useState(defaultReservationContext.reservation);

  function reservationsFetch() {
    axios
      .get("http://localhost:3310/api/seance")
      .then((response) => {
        setReservation(response.data);
        // console.info(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
    axios
      .get("http://localhost:3310/api/seance/taken")
      .then((response) => {
        setTaken(response.data);
        // console.info(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }
  useEffect(() => {
    reservationsFetch();
  }, []);

  const contextValue = useMemo(
    () => ({ reservation, setReservation, reservationsFetch, taken, setTaken }),
    [reservation, taken]
  );

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
}

ReservationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ReservationContext, ReservationContextProvider };
