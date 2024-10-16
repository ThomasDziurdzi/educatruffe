import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./ReservationHour.css";
import { ReservationContext } from "../../context/reservationContext";

import ConfirmPopUp from "../ConfirmPopUp/ConfirmPopUp";
import { dateCompare, todayDate } from "../../globalUtils";

function ReservationHour({ time, dayIndex, hourIndex, weekDay }) {
  const paramsServiceId = useParams();
  const [available, setAvailable] = useState(false);
  const [correspondingSeance, setCorrespondingSeance] = useState({});
  const { reservation, taken } = useContext(ReservationContext);
  const [popUp, setPopUp] = useState(false);

  const handleModal = () => {
    if (popUp === true) {
      setPopUp(!popUp);
    } else {
      setPopUp(!popUp);
    }
  };

  useEffect(() => {
    const exists = reservation.some(
      (item) =>
        item.dayIndex === dayIndex &&
        item.hourIndex === hourIndex &&
        item.serviceId === parseInt(paramsServiceId.id, 10)
    );
    const existingObject = reservation.find(
      (item) =>
        item.dayIndex === dayIndex &&
        item.hourIndex === hourIndex &&
        item.serviceId === parseInt(paramsServiceId.id, 10)
    );
    if (existingObject) {
      setCorrespondingSeance(existingObject);
      // console.info(correspondingSeance);
    }

    const isTaken =
      Array.isArray(taken) &&
      taken.some(
        (item) => item.dayIndex === dayIndex && item.hourIndex === hourIndex
      );
    if (exists) {
      setAvailable(true);
    }
    if (isTaken) {
      setAvailable(false);
    }
  }, [
    reservation,
    dayIndex,
    hourIndex,
    paramsServiceId,
    taken,
    correspondingSeance,
  ]);
  const currentItem = {
    date: weekDay,
    hour: time,
    dayIndex,
    hourIndex,
    serviceId: paramsServiceId,
  };

  return (
    <div className="hour">
      {available === true &&
      dateCompare(todayDate, currentItem.date.concat(" ", currentItem.hour)) ? (
        <div>
          <button
            className={`hour__button ${popUp ? `anchor` : ""}`}
            type="button"
            onClick={() => (popUp ? setPopUp(false) : setPopUp(true))}
          >
            {time}
          </button>
          {popUp && (
            <ConfirmPopUp
              handleModal={handleModal}
              // animateOut={animateOut}
              serviceId={paramsServiceId.id}
              weekDay={weekDay}
              correspondingSeance={correspondingSeance}
            />
          )}
        </div>
      ) : (
        <div className="hour__gray">
          <p>{time}</p>
        </div>
      )}
    </div>
  );
}

ReservationHour.propTypes = {
  time: PropTypes.string.isRequired,
  dayIndex: PropTypes.number.isRequired,
  hourIndex: PropTypes.number.isRequired,
  weekDay: PropTypes.string.isRequired,
};

export default ReservationHour;
