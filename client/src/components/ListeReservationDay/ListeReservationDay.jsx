import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";

import ReservationHour from "../ReservationHour/ReservationHour";
import "./ListeReservationDay.css";

function ListeReservationDay({ dayIndex, weekDay, reservations }) {
  // requete bdd en return ([{1: "active", 2: "non-active"}])
  const schedule = [
    { id: 1, time: "8:00" },
    { id: 2, time: "9:15" },
    { id: 3, time: "10:30" },
    { id: 4, time: "11:45" },
    { id: 5, time: "13:30" },
    { id: 6, time: "14:45" },
    { id: 7, time: "16:00" },
    { id: 8, time: "17:15" },
    { id: 9, time: "18:30" },
  ];

  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
    exit: {
      opacity: 0,
      duration: 0.3,
    },
  };

  const item = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div className="day__container">
      <h3 className="day__title">{weekDay.toString()}</h3>
      <div className="hour__container">
        <AnimatePresence>
          <motion.ul
            variants={list}
            animate="visible"
            initial="hidden"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {schedule.map((hour) => (
              <motion.li key={hour.id} variants={item}>
                <ReservationHour
                  time={hour.time}
                  weekDay={weekDay}
                  key={hour.id}
                  dayIndex={dayIndex}
                  hourIndex={hour.id}
                  reservations={reservations}
                />
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

ListeReservationDay.propTypes = {
  dayIndex: PropTypes.number.isRequired,
  weekDay: PropTypes.string.isRequired,
  reservations: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    dayIndex: PropTypes.number.isRequired,
    hourIndex: PropTypes.number.isRequired,
  }).isRequired,
};
export default ListeReservationDay;
