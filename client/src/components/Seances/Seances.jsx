import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SeanceCard from "../SeanceCard/SeanceCard";
import "./Seances.css";
import { dateCompare, todayDate } from "../../globalUtils";

function Seances({ userId }) {
  const [seances, setSeances] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/seance/user/${userId}/taken`
        );
        setSeances(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des séances :", error);
      }
    };

    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/service");
        setServices(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services :", error);
      }
    };

    const fetchData = async () => {
      await fetchSeances();
      await fetchServices();
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="seance__container">
      <div className="incoming-events__container">
        <h2>À venir</h2>
        <div className="incoming-events">
          {seances.map((seance) => {
            const service = services.find((s) => s.id === seance.serviceId);
            return service &&
              dateCompare(todayDate, seance.date.concat(" ", seance.hour)) ? (
              <SeanceCard
                key={seance.id}
                seance={seance}
                service={service}
                aVenir
              />
            ) : null;
          })}
        </div>
      </div>
      <div className="past-events__container">
        <h2>Passées</h2>
        <div className="past-events">
          {seances.map((seance) => {
            const service = services.find((s) => s.id === seance.serviceId);
            return service &&
              dateCompare(seance.date.concat(" ", seance.hour), todayDate) ? (
              <SeanceCard
                key={seance.id}
                seance={seance}
                service={service}
                aVenir={false}
              />
            ) : null;
          })}
          {/* {seances.map((seance) => {
            const service = services.find((s) => s.id === seance.serviceId);
            return (
              service && (
                <SeanceCard key={seance.id} seance={seance} service={service} />
              )
            );
          })} */}
        </div>
      </div>
    </section>
  );
}

Seances.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Seances;
