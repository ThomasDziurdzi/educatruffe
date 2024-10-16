import PropTypes from "prop-types";

import Star from "../svg/Star";
import noseworkGreen from "../../assets/images/nosework_green.png";
import mantrailing from "../../assets/images/mantrailling_with_green.png";
import comportement from "../../assets/images/comportement_with_green.png";
import "./SuperImage.css";

function SuperImage({ selectedImage }) {
  return (
    <div className="super__image">
      <Star className="star1" />

      {selectedImage === 1 && (
        <img
          src={noseworkGreen}
          alt="nosework logo"
          className="image__nosework__green"
        />
      )}
      {selectedImage === 2 && (
        <img
          src={mantrailing}
          alt="mantrailing logo"
          className="image__nosework__green"
        />
      )}
      {selectedImage === 3 && (
        <img
          src={comportement}
          alt="comportement logo"
          className="image__nosework__green"
        />
      )}
      <Star className="star2" />
    </div>
  );
}

SuperImage.propTypes = {
  selectedImage: PropTypes.number.isRequired,
};

export default SuperImage;
