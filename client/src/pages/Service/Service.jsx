import Adress from "../../components/Adress/Adress";
import ServiceSection from "../../components/ServiceSection/ServiceSection";

import "./Service.css";

function Service() {
  return (
    <div className="reservation__container">
      <h1>Bienvenue sur la page des Services</h1>
      <div className="reservation__box">
        <Adress />
        <ServiceSection />
      </div>
    </div>
  );
}

export default Service;
