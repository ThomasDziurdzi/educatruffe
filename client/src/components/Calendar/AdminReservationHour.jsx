import PropTypes from "prop-types";
// import axios from "axios";
import { useState, useContext, useEffect } from "react";

import { ReservationContext } from "../../context/reservationContext";
import AdminPopUp from "./AdminPopUp";
import "./AdminReservationHour.css";
// import { checkAvailability } from "./utils";

function AdminReservationHour({
  time,
  dayIndex,
  hourIndex,
  selectedService,
  submitListe,
  setSubmitListe,
  weekDay,
}) {
  const [available, setAvailable] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [submitSelectedService, setSubmitSelectedService] =
    useState(selectedService);
  const { reservation } = useContext(ReservationContext);
  const [popUp, setPopUp] = useState(false);

  const handleModal = () => {
    if (popUp === true) {
      setPopUp(!popUp);
    } else {
      setPopUp(!popUp);
    }
  };

  function checkAvailability(currentHourIndex, currentDayIndex, data) {
    const exists = data.filter(
      (item) =>
        item.hourIndex === currentHourIndex && item.dayIndex === currentDayIndex
    );
    return exists;
  }

  // function checkServiceId() {}

  useEffect(() => {
    if (checkAvailability(hourIndex, dayIndex, reservation).length > 0) {
      setAvailable(true);
      // console.log(checkAvailability(hourIndex, dayIndex, reservation));
    }
    // setAvailable(
    //   checkAvailability(hourIndex, dayIndex, reservations.reservation)
    // );
  }, [
    dayIndex,
    hourIndex,
    reservation.dayIndex,
    reservation.hourIndex,
    reservation,
  ]);

  const currentItem = {
    serviceId: selectedService,
    date: weekDay,
    hour: time,
    dayIndex,
    hourIndex,
  };
  const handleAddList = () => {
    setSubmitListe([...submitListe, currentItem]);

    if (!isButtonClicked) {
      setIsButtonClicked(true);
    }
    setSubmitSelectedService(selectedService);
  };

  function checkColor() {
    if (dayIndex !== undefined && hourIndex !== undefined) {
      if (
        checkAvailability(hourIndex, dayIndex, reservation)[0].serviceId === 1
      ) {
        // console.log("blue");
        return "blue";
      }
      if (
        checkAvailability(hourIndex, dayIndex, reservation)[0].serviceId === 2
      ) {
        return "green";
      }
      if (
        checkAvailability(hourIndex, dayIndex, reservation)[0].serviceId === 3
      ) {
        return "pink";
      }
      if (
        checkAvailability(hourIndex, dayIndex, reservation)[0].serviceId === 4
      ) {
        return "brown";
      }
      if (
        checkAvailability(hourIndex, dayIndex, reservation)[0].serviceId > 4
      ) {
        return "yellow";
      }
    }
    return null;
  }

  function checkSubmitColor() {
    if (submitSelectedService === 1) {
      // console.log("blue");
      return "blue";
    }
    if (submitSelectedService === 2) {
      return "green";
    }
    if (submitSelectedService === 3) {
      return "pink";
    }
    if (submitSelectedService === 4) {
      return "brown";
    }
    if (submitSelectedService > 4) {
      return "yellow";
    }
    return null;
  }

  return (
    <div className="hour">
      {/* {console.log(reservation)} */}
      {available === false ? (
        <button
          className={`hour__button ${isButtonClicked ? `${checkSubmitColor()}` : ""}`}
          type="button"
          value={{
            serviceId: selectedService,
            date: weekDay,
            hour: time,
            dayIndex,
            hourIndex,
          }}
          onClick={handleAddList}
        >
          {time}
        </button>
      ) : (
        <div>
          {popUp && <AdminPopUp dayIndex={dayIndex} hourIndex={hourIndex} />}

          <button
            className={`hour__button ${checkColor()} ${popUp ? `anchor--admin` : ""}`}
            type="button"
            onMouseEnter={() => handleModal()}
            onMouseLeave={() => handleModal()}
          >
            <p>{time}</p>
          </button>
        </div>
      )}
      {/* ) : (
      <div className="hour__gray">
          <p>{time}</p>
        </div>
      )} */}
    </div>
  );
}

AdminReservationHour.propTypes = {
  time: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired,
  hourIndex: PropTypes.number.isRequired,
  selectedService: PropTypes.number.isRequired,
  weekDay: PropTypes.string.isRequired,
  submitListe: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    dayIndex: PropTypes.number.isRequired,
    hourIndex: PropTypes.number.isRequired,
  }).isRequired,
  setSubmitListe: PropTypes.func.isRequired,
};

export default AdminReservationHour;
