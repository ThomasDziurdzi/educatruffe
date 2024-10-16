import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { days } from "./utils";
import AdminListeReservationDay from "./AdminListeReservationDay";
import ChevronLeft from "../svg/ChevronLeft";
import ChevronRight from "../svg/ChevronRight";
import "./AdminCalendar.css";
import { ReservationContext } from "../../context/reservationContext";

export default function AdminCalendar() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [submitListe, setSubmitListe] = useState([]);
  const [deleteList, setDeleteList] = useState([]);
  const { reservationsFetch, reservation, taken } =
    useContext(ReservationContext);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/service")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des services :", error);
      });
  }, []);

  function mergedReservations() {
    const result = [];
    for (let i = 0; i < reservation.length; i += 1) {
      let matchFound = false;
      for (let y = 0; y < taken.length; y += 1) {
        if (reservation[i].id === taken[y].id) {
          result.push(taken[y]);
          matchFound = true;
          break;
        }
      }
      if (!matchFound) {
        result.push(reservation[i]);
      }
    }
    return result;
  }

  const handleDelete = async () => {
    console.info("Form submitted");

    try {
      await Promise.all(
        mergedReservations().map((item) => {
          const newItem = { ...item };

          delete newItem.dayIndex;
          delete newItem.hourIndex;

          if (newItem.firstName !== undefined) {
            axios
              .put(
                `http://localhost:3310/api/seance/taken/${newItem.id}`,
                newItem
              )
              .then((response) => {
                console.info("Response from server:", response.data);
                // checkAvailability(hourIndex, dayIndex, reservations.reservation).length > 0) {setAvailable(true)}
              });
          } else {
            axios
              .put(`http://localhost:3310/api/seance/${newItem.id}`, newItem)
              .then((response) => {
                console.info("Response from server:", response.data);
                // checkAvailability(hourIndex, dayIndex, reservations.reservation).length > 0) {setAvailable(true)}
              });
          }
          return null;
        })
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const handleSubmit = async (e) => {
    const noDouble = [];

    for (let i = 0; i < submitListe.length; i += 1) {
      const currentElement = submitListe[i];
      const isDuplicate = noDouble.some(
        (a) =>
          a.dayIndex === currentElement.dayIndex &&
          a.hourIndex === currentElement.hourIndex
      );

      if (!isDuplicate) {
        noDouble.push(currentElement);
      }
    }

    e.preventDefault();

    console.info("Form submitted");

    try {
      await Promise.all(
        noDouble.map((item) =>
          axios
            .post("http://localhost:3310/api/seance", item)
            .then((response) => {
              console.info("Response from server:", response.data);
            })
        )
      );
      await reservationsFetch();
      setSubmitListe([]);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="adminCalendar__container">
      <h2 className="adminCalendar__title">Calendrier Administratif</h2>

      <form className="adminCalendar__days" onSubmit={(e) => handleSubmit(e)}>
        <div className="adminCalendar__form">
          <button
            type="button"
            className="adminCalendar__chevron adminCalendar__chevron--left"
          >
            {null}
            <ChevronLeft />
          </button>
          <div className="adminCalendar__liste mobile">
            {days.map((day) => (
              <AdminListeReservationDay
                key={day.dayIndex}
                dayIndex={day.dayIndex}
                weekDay={day.weekDay}
                selectedService={selectedService}
                submitListe={submitListe}
                setSubmitListe={setSubmitListe}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
              />
            ))}
          </div>

          <button type="button" className="adminCalendar__chevron">
            {null}
            <ChevronRight />
          </button>
        </div>
        <div className="adminCalendar__buttons">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className={service.id === selectedService ? "selected" : ""}
              onClick={() => setSelectedService(service.id)}
            >
              {service.serviceName}
            </button>
          ))}
          <button
            className="btn__delete"
            type="button"
            onClick={() => handleDelete()}
          >
            supprimer
          </button>
          <button className="btn__validate" type="submit">
            valider
          </button>
        </div>
      </form>
    </div>
  );
}
