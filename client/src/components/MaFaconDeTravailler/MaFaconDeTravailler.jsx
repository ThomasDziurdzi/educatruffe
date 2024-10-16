import PurpleStrokeSvg from "../svg/PurpleStrokeSvg";
import Grillage from "../svg/Grillage";
import Poils from "../svg/Poils";
import "./MaFaconDeTravailler.css";

function MaFaconDeTravailler() {
  return (
    <div className="travail travail--anchor">
      <Poils className="poils" />
      <Grillage />
      <PurpleStrokeSvg />

      <h2 className="travail__title">Ma façon de travailler</h2>
      <p className="travail__paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
        fringilla mattis. Sed in dolor sed orci sodales pulvinar. Etiam non mi
        et quam convallis ultrices. Morbi magna orci, posuere non dapibus vel,
        tempor et eros. Donec quis urna ut leo sodales pretium sit amet sed
        nibh. Fusce ornare nulla sed accumsan ullamcorper.
      </p>
    </div>
  );
}

export default MaFaconDeTravailler;
