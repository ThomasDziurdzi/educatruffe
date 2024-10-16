import axios from "axios";
import PropTypes from "prop-types";
import { useRef, useEffect, useState, useCallback, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { ReservationContext } from "../../context/reservationContext";

import "./ConfirmPopUp.css";

function ConfirmPopUp({
  serviceId,
  weekDay,
  handleModal,
  correspondingSeance,
}) {
  const [dogListe, setDogListe] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("undefined");
  const [dogId, setDogId] = useState();
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const { auth } = useAuth();
  const popUpRef = useRef();
  const { reservationsFetch } = useContext(ReservationContext);

  //  ///////////////////////////////////////  /////////////////////////////////////
  const handleClickOutside = useCallback(
    (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        handleModal();
      }
    },
    [handleModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  //  ///////////////////////////////////////  /////////////////////////////////////

  //  ///////////////////////////////////////  /////////
  useEffect(() => {
    async function fetchData() {
      try {
        const [dogsResponce, serviceResponse] = await Promise.all([
          axios.get(`http://localhost:3310/api/dog/user/${auth.userId}`),
          axios.get(`http://localhost:3310/api/service`),
        ]);
        setDogListe(dogsResponce.data);
        setServices(serviceResponse.data);

        const selectedService = serviceResponse.data.find(
          (item) => item.id === parseInt(serviceId[0], 10)
        );
        if (selectedService) {
          setServiceName(selectedService.serviceName);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
    setShouldFetchData(false);
  }, [auth.userId, serviceId, shouldFetchData]);

  //  -------------LEGACY UNOPTIMISED CODE---------------
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [handleClickOutside]);
  // useEffect(() => {
  //   function userDogFetch() {
  //     axios
  //       .get(http://localhost:3310/api/dog/user/${auth.userId})
  //       .then((response) => {
  //         setDogListe(response.data);
  //         // console.info(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de la récupération des services :", error);
  //       });
  //   }
  //   function servicesFetch() {
  //     axios
  //       .get(http://localhost:3310/api/service)
  //       .then((response) => {
  //         setServices(response.data);
  //         // console.info(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Erreur lors de la récupération des services :", error);
  //       });
  //   }
  //   function checkServiceName() {
  //     if (services.length === 0) {
  //       return null;
  //     }
  //     const result = services.filter(
  //       (item) => item.id === parseInt(serviceId, 10)
  //     );
  //     setServiceName(result[0].serviceName);
  //     return null;
  //   }
  //   userDogFetch();
  //   servicesFetch();
  //   checkServiceName();
  // }, [auth.userId, serviceId, services]);
  //  -------------LEGACY UNOPTIMISED CODE---------------

  const handleSubmit = async () => {
    // e.preventDefault();
    const newSubmitListe = {
      serviceId,
      date: correspondingSeance.date,
      hour: correspondingSeance.hour,
      dayIndex: correspondingSeance.dayIndex,
      hourIndex: correspondingSeance.hourIndex,
      userId: auth.userId,
      dogId,
    };
    // setSubmitListe(newSubmitListe);
    try {
      // console.log("submit list:", newSubmitListe);
      axios.put(
        `http://localhost:3310/api/seance/${correspondingSeance.id}`,

        newSubmitListe
      );
    } catch (error) {
      console.error(
        "error during put on ",
        `http://localhost:3310/api/seance/${correspondingSeance.id}`
      );
    }

    reservationsFetch();
    setShouldFetchData(true);
  };

  return (
    <form
      className="confirmPopUp__container"
      ref={popUpRef}
      onSubmit={handleSubmit}
    >
      {/* {console.log("corresponding seance :", correspondingSeance)} */}
      {/* {console.log(parseInt(serviceId, 10))} */}
      {/* {console.log(serviceName)} */}
      <div className="confirmPopUp__title">
        {/* {console.log(correspondingSeance)} */}
        {/* {console.log(submitListe)} */}
        <h2>Confirmer le rendez vous ?</h2>
      </div>
      <div className="confirmPopUp__paragraph">
        {console.info(services)}
        <h4>Service</h4>
        <p>{serviceName}</p>
      </div>
      <div className="confirmPopUp__paragraph">
        <h4>Rendez-vous</h4>
        <p>{weekDay.toString()}</p>
      </div>
      <div className="confirmPopUp__paragraph">
        <h4>Nom du chien</h4>
        {dogListe.map((dog) => (
          <div key={dog.id} className="">
            <input
              type="radio"
              name="dogName"
              id={dog.dogName}
              value={dog.dogId}
              onClick={() => setDogId(dog.id)}
            />
            <label htmlFor={dog.dogName} onChange={() => setDogId(dog.id)}>
              {dog.dogName}
            </label>
            {/* {dog.dogName} */}
          </div>
        ))}
      </div>
      <div className="confirmPopUp__button">
        <button type="submit">valider</button>
      </div>
    </form>
  );
}

ConfirmPopUp.propTypes = {
  serviceId: PropTypes.string.isRequired,
  weekDay: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
  correspondingSeance: PropTypes.arrayOf(
    PropTypes.shape({
      serviceId: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      hour: PropTypes.string.isRequired,
      dayIndex: PropTypes.number.isRequired,
      hourIndex: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ConfirmPopUp;
