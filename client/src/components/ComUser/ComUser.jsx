// Hook
import axios from "axios";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// CSS
import "./ComUser.css";

function ComUser({ handleComModal, seance }) {
  // je détermine l'état initial pour la note soit 0
  const [rating, setRating] = useState(0);

  // je détermine l'état des étoiles au survol
  const [hover, setHover] = useState(0);
  const { auth } = useAuth();
  const [submitText, setSubmitText] = useState("");

  const comModalRef = useRef();

  const handleSubmit = async () => {
    const submitComment = {
      serviceId: seance.serviceId,
      text: submitText,
      userId: auth.userId,
      rating,
      approved: 0,
      firstName: seance.firstName,
      lastName: seance.lastName,
    };
    try {
      const response = await axios.post(
        "http://localhost:3310/api/commentaire",
        submitComment
      );
      console.info("reponse du server:", response.data);
    } catch (err) {
      console.error("erreur sur ton post:", err);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (comModalRef.current && !comModalRef.current.contains(event.target)) {
        handleComModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleComModal]);

  return (
    <div className="com__user__global">
      <div className="comuser__form__container" ref={comModalRef}>
        <button
          className="modal__closeButton"
          type="button"
          onClick={() => handleComModal()}
        >
          x
        </button>
        <p className="modal__hesiter">
          N'hésitez pas à laisser un commentaire :
        </p>
        <form onSubmit={() => handleSubmit()}>
          <section className="form__rating">
            <fieldset>
              <legend>Évaluez votre expérience :</legend>
              <div className="star__rating">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index.id}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        required
                      />

                      <span
                        role="button"
                        tabIndex="0"
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(ratingValue)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            setRating(ratingValue);
                          }
                        }}
                        //  Obligation de mettre du style ici pour les étoiles au survol
                        style={{
                          color:
                            hover >= ratingValue || rating >= ratingValue
                              ? "#837ebf"
                              : "#c5c2d4",
                        }}
                      >
                        ★
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </section>

          <section className="form__comment">
            <textarea
              id="comment"
              type="textarea"
              name="comment"
              cols="57"
              rows="15"
              placeholder="Écrivez votre message ici ..."
              required
              onChange={(e) => setSubmitText(e.target.value)}
            />
            <button type="submit">Valider</button>
          </section>
        </form>
      </div>
    </div>
  );
}

ComUser.propTypes = {
  seance: PropTypes.shape({
    date: PropTypes.string.isRequired,
    dayIndex: PropTypes.number.isRequired,
    dogId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    hourIndex: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    serviceId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  handleComModal: PropTypes.func.isRequired,
};

export default ComUser;
