import PropTypes from "prop-types";

function AddSvg({ onClick, className }) {
  return (
    <svg
      onClick={onClick}
      className={className}
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="button"
      aria-label="Ajouter"
    >
      <title>addsvg</title>
      <path
        d="M59.5 34C59.5 19.9219 48.0781 8.5 34 8.5C19.9219 8.5 8.5 19.9219 8.5 34C8.5 48.0781 19.9219 59.5 34 59.5C48.0781 59.5 59.5 48.0781 59.5 34Z"
        stroke="#00CAA5"
        strokeWidth="6"
        strokeMiterlimit="10"
      />
      <path
        d="M34 23.375V44.625M44.625 34H23.375"
        stroke="#00CAA5"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

AddSvg.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

AddSvg.defaultProps = {
  onClick: () => {},
  className: "",
};

export default AddSvg;
