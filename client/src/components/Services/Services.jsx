import { useEffect, useState } from "react";
import axios from "axios";

import AddService from "./AddServices";
import "./Services.css";

function Services() {
  const [servicesData, setServicesData] = useState([]); // stocke les données recuperées via .get
  const [error, setError] = useState(null);
  const [servicesEdit, setServicesEdit] = useState(null);

  const getServices = () => {
    // ----------get service ----------
    axios
      .get(`http://localhost:3310/api/service/`) // lit les données de la bdd(read)
      .then((response) => {
        setServicesData(response.data);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des services");
        console.error("Erreur:", err);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  // ----------edit service ----------
  const saveChanges = () => {
    const formData = new FormData();
    formData.append("serviceName", servicesEdit.serviceName);
    formData.append("description", servicesEdit.description);
    formData.append("servicePrice", servicesEdit.servicePrice);
    formData.append("duration", servicesEdit.duration);

    // Append image file if it exists
    if (servicesEdit.image) {
      formData.append("image", servicesEdit.image);
    }

    axios
      .put(`http://localhost:3310/api/service/${servicesEdit.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const updatedServices = servicesData.map((service) =>
          service.id === servicesEdit.id ? response.data : service
        );
        setServicesData(updatedServices);
        setServicesEdit(null);
      })
      .catch((err) => {
        setError("Erreur lors de la modification des services");
        console.error("Erreur :", err);
      });
  };

  // ----------delete service ----------
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3310/api/service/${id}`)
      .then(() => {
        setServicesData((prevServices) =>
          prevServices.filter((service) => service.id !== id)
        );
      })
      .catch((err) => {
        setError("Erreur lors de la suppression des services");
        console.error("Erreur lors de la suppression des services", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveChanges();
  };

  const startEditing = (service) => {
    setServicesEdit(service);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setServicesEdit({
      ...servicesEdit,
      [name]: files ? files[0] : value,
    });
  };

  const cancelEdit = () => {
    setServicesEdit(null);
  };

  return (
    <div className="services__container">
      <h2>Liste des Services</h2>
      {error && <p className="error">{error}</p>}
      <div className="services__tableContainer">
        <table className="services__table">
          <thead>
            <tr className="services__header">
              <th>Titre</th>
              <th>Service Proposé</th>
              <th>Temps de session</th>
              <th>Prix</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((service) => (
              <tr className="services__row" key={service.id}>
                <td>{service.serviceName}</td>
                <td>{service.description}</td>
                <td>{service.duration}</td>
                <td>{service.servicePrice} €</td>
                <td>
                  <img
                    src={`http://localhost:3310${service.image}`}
                    alt="Service"
                    width="100"
                    height="100"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn__edit"
                    onClick={() => startEditing(service)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="btn__delete"
                    onClick={() => handleDelete(service.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="services__box1">
        <AddService getServices={getServices} />
      </div>

      {servicesEdit && (
        <div className="services__edit">
          <form className="services__editTable" onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr className="services__editheader">
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Temps de session</th>
                  <th>Image</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="services__editRow">
                  <td>
                    <label htmlFor="serviceName">{null}</label>
                    <input
                      type="text"
                      id="serviceName"
                      name="serviceName"
                      value={servicesEdit.serviceName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <label htmlFor="serviceName">{null}</label>
                    <textarea
                      id="description"
                      name="description"
                      value={servicesEdit.description}
                      onChange={handleEditChange}
                      rows={5}
                      style={{ resize: "vertical", width: "100%" }}
                    />
                  </td>
                  <td>
                    <label htmlFor="serviceName">{null}</label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={servicesEdit.duration}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <label htmlFor="serviceName">{null}</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <label htmlFor="serviceName">{null}</label>
                    <input
                      type="text"
                      id="servicePrice"
                      name="servicePrice"
                      value={servicesEdit.servicePrice}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button type="submit" className="btn__save">
                      Sauvegarder
                    </button>
                    <button
                      type="button"
                      className="btn__cancel"
                      onClick={cancelEdit}
                    >
                      Annuler
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      )}
    </div>
  );
}

export default Services;
