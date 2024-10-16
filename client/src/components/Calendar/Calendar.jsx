import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListeReservationDay from "../ListeReservationDay/ListeReservationDay";
import { days } from "./utils";

import ArrowLeft from "../svg/ArrowLeft";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";

function Calendar({ reservations }) {
  return (
    <section className="reservation__right">
      <h2 className="reservation__title">
        <Link to="/service">
          <ArrowLeft />
        </Link>
        Choississez la date et l'horaire de votre rendez-vous
      </h2>
      <div className="reservation__days">
        <button
          type="button"
          // onMouseDown=""
          className="reservation__chevron reservation__chevron--left"
        >
          {null}
          <ChevronLeft />
        </button>
        <div className="reservation__liste mobile">
          {days.map((day) => (
            <ListeReservationDay
              key={day.dayIndex}
              dayIndex={day.dayIndex}
              weekDay={day.weekDay}
              reservations={reservations}
            />
          ))}
        </div>
        <button
          type="button"
          // onMouseDown=""
          className="reservation__chevron"
        >
          {null}
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

Calendar.propTypes = {
  reservations: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    dayIndex: PropTypes.number.isRequired,
    hourIndex: PropTypes.number.isRequired,
  }).isRequired,
};
export default Calendar;
