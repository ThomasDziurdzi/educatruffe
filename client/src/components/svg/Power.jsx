import PropTypes from "prop-types";

function Power({ power }) {
  return (
    <svg
      width="30"
      height="29"
      className={power}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>power</title>
      <path
        d="M21.9102 6.11719C23.1499 7.13429 24.1485 8.41373 24.8341 9.8633C25.5197 11.3129 25.8752 12.8965 25.875 14.5C25.875 20.5039 21.004 25.375 15 25.375C8.99614 25.375 4.12505 20.5039 4.12505 14.5C4.12029 12.9014 4.46805 11.3213 5.14356 9.87241C5.81907 8.42349 6.80572 7.14132 8.03325 6.11719M15 3.625V14.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Power.propTypes = {
  power: PropTypes.string.isRequired,
};

export default Power;
