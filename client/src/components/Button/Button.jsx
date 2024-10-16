import PropTypes from "prop-types";
import "./Button.css";

function Button({ text, img: Icon, onClick, type }) {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className="reservationButton"
      onClick={onClick}
    >
      {text}
      {Icon && <Icon />}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.elementType,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

Button.defaultProps = {
  img: null,
  onClick: () => {},
  type: "button", // Par défaut, le type est "button"
};

export default Button;
