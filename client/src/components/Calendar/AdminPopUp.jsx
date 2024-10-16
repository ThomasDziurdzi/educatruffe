import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { ReservationContext } from "../../context/reservationContext";

import "./AdminPopUp.css";

function AdminPopUp({ hourIndex, dayIndex }) {
  const [correspondingSeance, setCorrespondingSeance] = useState({});
  const [indisponible, setIndisponible] = useState(false);
  const { reservation, taken } = useContext(ReservationContext);

  useEffect(() => {
    const exists = taken.some(
      (item) => item.dayIndex === dayIndex && item.hourIndex === hourIndex
    );
    const existingObject = taken.find(
      (item) => item.dayIndex === dayIndex && item.hourIndex === hourIndex
    );
    if (existingObject) {
      setIndisponible(exists);
      setCorrespondingSeance(existingObject);
      //   console.info(correspondingSeance);
      //   console.info(exists);
    }
  }, [reservation, dayIndex, hourIndex, taken, correspondingSeance]);

  return (
    <div className="adminPopUp__container">
      {indisponible ? (
        <p>
          maitre: {correspondingSeance.firstName} {correspondingSeance.lastName}{" "}
          <br />
          chien: {correspondingSeance.dogName}
        </p>
      ) : (
        <p>disponible</p>
      )}
    </div>
  );
}

AdminPopUp.propTypes = {
  dayIndex: PropTypes.number.isRequired,
  hourIndex: PropTypes.number.isRequired,
};

export default AdminPopUp;
