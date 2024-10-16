import PropTypes from "prop-types";

function ScrollTop({ className, height = 64, width = 64, onClick }) {
  return (
    <div onClick={onClick} aria-hidden="true">
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.17627 21.8348C5.34791 12.5767 12.5767 5.34791 21.8348 3.17627C28.521 1.60791 35.479 1.60791 42.1653 3.17627C51.4233 5.34791 58.652 12.5767 60.8237 21.8348C62.392 28.521 62.392 35.479 60.8237 42.1653C58.652 51.4233 51.4233 58.652 42.1653 60.8237C35.479 62.392 28.521 62.392 21.8348 60.8237C12.5767 58.652 5.34791 51.4233 3.17627 42.1653C1.60791 35.479 1.60791 28.521 3.17627 21.8348Z"
          fill="white"
          stroke="#00caa5"
          strokeWidth="3"
        />
        <path d="M23.667 35.3333L32.0003 27L40.3337 35.3333" fill="white" />
        <path
          d="M23.667 35.3333L32.0003 27L40.3337 35.3333"
          stroke="#00caa5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

ScrollTop.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ScrollTop;
