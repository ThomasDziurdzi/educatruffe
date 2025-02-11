import PropTypes from "prop-types";

function Zigzag({ className }) {
  return (
    <svg
      className={className}
      width="113"
      height="111"
      viewBox="0 0 113 111"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.86 11.28C22.065 11.635 36.175 2.20502 36.525 2.81502C37.45 4.42002 2.87 37.62 3.46 38.645C4.67 40.745 65.19 -0.35998 66.65 2.16502C68.24 4.92002 1.325 54.77 2.235 56.345C3.505 58.54 82.59 5.58002 84.48 8.86002C85.885 11.29 0.0200022 69.285 2.19 73.045C3.34 75.035 97.77 14.52 99.22 17.025C101.15 20.365 7.285 83.98 8.645 86.34C9.73 88.22 106.175 27.53 107.26 29.405C109.595 33.445 16.155 94.27 18.125 97.68C20.095 101.09 109.78 41.275 111.29 43.89C113.22 47.23 31.91 103.28 33.275 105.645C34.21 107.265 108.43 58.02 110.265 61.195C111.82 63.89 55.035 106.775 56.435 109.205C57.315 110.73 104.025 78.775 105.305 80.99"
        stroke="#837EBF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Zigzag.propTypes = {
  className: PropTypes.string,
};

Zigzag.defaultProps = {
  className: "",
};

export default Zigzag;
