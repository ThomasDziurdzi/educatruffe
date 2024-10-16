import Poils from "../svg/Poils";
import "./Envie.css";

function Envie() {
  return (
    <section className="envie">
      <div className="envie__left">{null}</div>
      <div className="envie__container">
        <h2 className="envie__title">Envie de t'éclater avec ton chien ?</h2>
        <p className="envie__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          fringilla mattis. Sed in dolor sed orci sodales pulvinar. Etiam non mi
          et quam convallis ultrices. Morbi magna orci, posuere non dapibus vel,
          tempor et eros. Donec quis urna ut leo sodales pretium sit amet sed
          nibh. Fusce ornare nulla sed accumsan ullamcorper.
        </p>
        <div className="envie__button--container">
          <Poils className="poils anchored-notice" />
          <button type="button" className="envie__button anchor">
            Prends Rendez-vous !
          </button>
        </div>
      </div>
    </section>
  );
}
export default Envie;
