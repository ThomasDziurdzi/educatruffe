import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import AddSvg from "../svg/AddSvg";
import Edit from "../svg/Edit";
import "./DogCard.css";

function DogCard({ userId }) {
  const [dogsData, setDogsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDogId, setEditingDogId] = useState(null);
  const [error, setError] = useState(null);
  const [newDog, setNewDog] = useState({
    dogName: "",
    description: "",
  });

  useEffect(() => {
    // ----------get dogs ----------
    axios
      .get(`http://localhost:3310/api/dog/user/${userId}`)
      .then((response) => {
        setDogsData(response.data);

        if (response.data.length === 0) {
          setShowForm(true);
        }
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des chiens");
        console.error("Erreur:", err);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingDogId !== null) {
      // ---------- edit dog ----------
      axios
        .put(`http://localhost:3310/api/dog/${editingDogId}`, {
          ...newDog,
          userId,
        })
        .then(() => {
          setDogsData((prevDogs) =>
            prevDogs.map((dog) =>
              dog.id === editingDogId
                ? {
                    ...dog,
                    dogName: newDog.dogName,
                    description: newDog.description,
                  }
                : dog
            )
          );
          setEditingDogId(null);
        })
        .catch((err) => {
          setError("Erreur lors de la modification du chien");
          console.error("Erreur:", err);
        });
    } else {
      // ---------- add dog ----------
      axios
        .post("http://localhost:3310/api/dog", { ...newDog, userId })
        .then((response) => {
          setDogsData([...dogsData, { id: response.data.insertId, ...newDog }]);
          setShowForm(false);
        })
        .catch((err) => {
          setError("Erreur lors de l'ajout du chien");
          console.error("Erreur:", err);
        });
    }
    setNewDog({ dogName: "", description: "" });
  };

  const handleDelete = (id) => {
    axios
      // ---------- delete dog ----------
      .delete(`http://localhost:3310/api/dog/${id}`)
      .then(() => {
        setDogsData((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
      })
      .catch((err) => {
        setError("Erreur lors de la suppression du chien");
        console.error("Erreur:", err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDog((prevDog) => ({
      ...prevDog,
      [name]: value,
    }));
  };

  const handleEdit = (dog) => {
    setNewDog({ dogName: dog.dogName, description: dog.description });
    setEditingDogId(dog.id);
  };

  const handleCancel = () => {
    setEditingDogId(null);
    setShowForm(false);
  };

  return (
    <div
      className={`dogCard__Section ${dogsData.length > 0 ? "has-dogs" : ""}`}
    >
      {error && <p>{error}</p>}
      {dogsData.length > 0 &&
        dogsData.map((dog) => (
          <div className="dogCard__container" key={dog.id}>
            {editingDogId === dog.id ? (
              <>
                <input
                  type="text"
                  name="dogName"
                  placeholder="Nom du chien"
                  value={newDog.dogName}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newDog.description}
                  onChange={handleChange}
                  required
                />
                <div className="dogCard__footer">
                  <Button type="button" text="Valider" onClick={handleSubmit} />
                  <Button text="Annuler" onClick={handleCancel} />
                </div>
              </>
            ) : (
              <>
                <h3>{dog.dogName}</h3>
                <p>{dog.description}</p>
                <div className="dogCard__footer">
                  <Edit
                    onClick={() => handleEdit(dog)}
                    className="dogCard__edit-button"
                  />
                  <Button
                    text="supprimer"
                    onClick={() => handleDelete(dog.id)}
                  />
                </div>
              </>
            )}
          </div>
        ))}

      <AddSvg
        onClick={() => {
          setShowForm(true);
          setEditingDogId(null);
        }}
        className="addsvg"
      />
      {showForm && (
        <form className="dogCard__container" onSubmit={handleSubmit}>
          <input
            type="text"
            name="dogName"
            placeholder="Nom du chien"
            value={newDog.dogName}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newDog.description}
            onChange={handleChange}
            required
          />
          <div className="content">
            <p>Ajoutez votre chien</p>
          </div>
          <div className="dogCard__footer">
            <Button type="submit" text="Valider" />
            <Button text="Annuler" onClick={handleCancel} />
          </div>
        </form>
      )}
    </div>
  );
}

DogCard.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default DogCard;
