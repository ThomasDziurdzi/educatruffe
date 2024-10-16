import { useState } from "react";
import PropTypes from "prop-types";

import "./AddServices.css";
import axios from "axios";

function AddService({ getServices }) {
  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    servicePrice: "",
    duration: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("serviceName", newService.serviceName);
    formData.append("description", newService.description);
    formData.append("servicePrice", newService.servicePrice);
    formData.append("duration", newService.duration);

    if (newService.image) {
      formData.append("image", newService.image);
    }

    await axios
      .post("http://localhost:3310/api/service/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.info(response.data);
        setNewService({
          serviceName: "",
          description: "",
          servicePrice: "",
          duration: "",
          image: null,
        });
        getServices();
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout", err);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewService({ ...newService, image: files[0] });
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  return (
    <div className="add-service__container">
      <h2>Ajouter un nouveau service</h2>
      <form onSubmit={handleSubmit} className="add-service__form">
        <table className="add-service__table">
          <thead>
            <tr className="addServices__header">
              <th>Titre</th>
              <th>Service Proposé</th>
              <th>Image</th>
              <th>Prix</th>
              <th>Temps de la session</th>
            </tr>
          </thead>
          <tbody>
            <tr className="addServices__row">
              <td>
                <label htmlFor="serviceName">{null}</label>
                <input
                  type="text"
                  id="serviceName"
                  name="serviceName"
                  placeholder="Nom du service"
                  value={newService.serviceName}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <label htmlFor="description">{null}</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description du service"
                  value={newService.description}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <label htmlFor="image">{null}</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <label htmlFor="servicePrice">{null}</label>
                <input
                  type="number"
                  id="servicePrice"
                  name="servicePrice"
                  placeholder="Prix"
                  value={newService.servicePrice}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <label htmlFor="duration">{null}</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="Temps de la session"
                  value={newService.duration}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn__add-service">
          Ajouter le service
        </button>
      </form>
    </div>
  );
}

AddService.propTypes = {
  getServices: PropTypes.func.isRequired,
};

export default AddService;
