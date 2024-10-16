import PropTypes from "prop-types";

function BurgerIcon({ width, height, onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={onClick}
      alt="Burger Icon"
    >
      <g fill="#000" fillRule="evenodd">
        <path d="M0 0h24v3H0zM0 7h24v3H0zM0 14h24v3H0z" />
      </g>
    </svg>
  );
}

BurgerIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onClick: PropTypes.func,
};

BurgerIcon.defaultProps = {
  onClick: null,
};

export default BurgerIcon;
