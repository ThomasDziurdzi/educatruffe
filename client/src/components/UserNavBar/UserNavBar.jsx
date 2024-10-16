import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./UserNavBar.css";

function UserNavBar({ onButtonClick }) {
  return (
    <section className="usernav__container">
      <div className="usernav__content">
        <Button text="Séances" onClick={() => onButtonClick("seance")} />
        <Button text="Chiens" onClick={() => onButtonClick("dogs")} />
        <Button text="Modifier" onClick={() => onButtonClick("modify")} />
      </div>
      <div className="adress__border">{null}</div>
    </section>
  );
}

UserNavBar.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
};

export default UserNavBar;
