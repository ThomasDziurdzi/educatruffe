import PropTypes from "prop-types";

import "./SuperText.css";

function SuperText({
  selectedText,
  setSelectedText,
  setSelectedImage,
  selectedTitre,
  setSelectedTitre,
}) {
  const handlePrevious = () => {
    if (selectedText === 1) {
      setSelectedText(3);
      setSelectedImage(3);
      setSelectedTitre(3);
    } else {
      setSelectedText(selectedText - 1);
      setSelectedImage(selectedText - 1);
      setSelectedTitre(selectedText - 1);
    }
  };

  const handleNext = () => {
    if (selectedText === 3) {
      setSelectedText(1);
      setSelectedTitre(1);
      setSelectedImage(1);
    } else {
      setSelectedText(selectedText + 1);
      setSelectedTitre(selectedText + 1);
      setSelectedImage(selectedText + 1);
    }
  };

  const handleCarrousselButton = (e) => {
    setSelectedText(parseInt(e, 10));
    setSelectedTitre(parseInt(e, 10));
    setSelectedImage(parseInt(e, 10));
  };

  return (
    <div className="nosework__card">
      <div className="nosework__card__header">
        <span className="card__header__title">
          {selectedTitre === 1 && <p>Nosework</p>}
          {selectedTitre === 2 && <p>Mantrailing</p>}
          {selectedTitre === 3 && <p>Comportement</p>}
        </span>
      </div>
      <div className="nosework__card__content">
        {selectedText === 1 && (
          <p>
            texte 1 ipsum dolor sit amet consectetur adipisicing elit. Optio
            ducimus reprehenderit odio asperiores quo itaque id alias nesciunt
            blanditiis Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem esse laudantium rerum perferendis eius obcaecati mollitia
            quisquam non
          </p>
        )}
        {selectedText === 2 && (
          <p>
            texte 2 ipsum dolor sit amet consectetur adipisicing elit. Optio
            ducimus reprehenderit odio asperiores quo itaque id alias nesciunt
            blanditiis Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem esse laudantium rerum perferendis eius obcaecati mollitia
            quisquam non
          </p>
        )}
        {selectedText === 3 && (
          <p>
            texte 3 ipsum dolor sit amet consectetur adipisicing elit. Optio
            ducimus reprehenderit odio asperiores quo itaque id alias nesciunt
            blanditiis Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Autem esse laudantium rerum perferendis eius obcaecati mollitia
            quisquam non
          </p>
        )}
        <div className="boutons__carrousel__container">
          <button
            type="button"
            className="card__header__nav-icon"
            onClick={() => handlePrevious()}
          >
            {"<"}
          </button>
          <button
            value={1}
            className={`boutons__carrousel ${selectedTitre === 1 && `boutons__carrousel--selected`}`}
            type="button"
            aria-label="carroussel button"
            onClick={(e) => handleCarrousselButton(e.target.value)}
          />
          <button
            value={2}
            className={`boutons__carrousel ${selectedTitre === 2 && `boutons__carrousel--selected`}`}
            type="button"
            aria-label="carroussel button"
            onClick={(e) => handleCarrousselButton(e.target.value)}
          />
          <button
            value={3}
            className={`boutons__carrousel ${selectedTitre === 3 && `boutons__carrousel--selected`}`}
            type="button"
            aria-label="carroussel button"
            onClick={(e) => handleCarrousselButton(e.target.value)}
          />
          <button
            type="button"
            className="card__header__nav-icon"
            onClick={() => handleNext()}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

SuperText.propTypes = {
  selectedText: PropTypes.number.isRequired,
  setSelectedText: PropTypes.func.isRequired,
  selectedTitre: PropTypes.number.isRequired,
  setSelectedTitre: PropTypes.func.isRequired,
  setSelectedImage: PropTypes.func.isRequired,
};

export default SuperText;
