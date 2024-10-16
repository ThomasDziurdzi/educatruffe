import { useState, useEffect } from "react";
import axios from "axios";
import "./ServiceSection.css";
import ServiceCard from "../ServiceCard/ServiceCard";
import AppointementRequestCard from "../ServiceCard/AppointementRequestCard";
import Loupe from "../svg/Loupe";
import doggo from "../../assets/images/dog1.jpg";

function ServiceSection() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="serviceSection">
      <div className="serviceSection__container">
        <p className="serviceSection__title">
          Sélectionnez la séance qui vous intéresse
        </p>
        <div className="serviceSection__search">
          <input
            type="text"
            placeholder="Rechercher un service"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Loupe />
        </div>
      </div>
      <div className="serviceSection__card">
        <AppointementRequestCard />
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image || doggo}
              serviceName={service.serviceName}
              description={service.description}
              servicePrice={service.servicePrice}
              duration={service.duration}
              serviceId={service.id}
            />
          ))
        ) : (
          <p>Aucun service trouvé</p>
        )}
      </div>
    </section>
  );
}
export default ServiceSection;
