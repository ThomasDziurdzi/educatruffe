// Components
import MaFaconDeTravailler from "../../components/MaFaconDeTravailler/MaFaconDeTravailler";
import CarousselDogPictures from "../../components/CarousselDogPictures/CarousselDogPictures";
import LeFlair from "../../components/LartDuFlair/LeFlair";
import SuperServices from "../../components/SuperServices/SuperServices";
import ContactHelpSection from "../../components/ContactHelpSection/ContactHelpSection";
import VosAvis from "../../components/VosAvis/VosAvis";
import Footer from "../../components/Footer/Footer";
import Envie from "../../components/Envie/Envie";
import Newsletter from "../../components/Newsletter/Newsletter";
import ButtonToScroll from "../../components/ButtonToScroll/ButtonToScroll";
// import Poils from "../../components/svg/Poils";

// CSS
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <ButtonToScroll />
      <div className="home__container">
        <LeFlair />
        <div className="maFaconDeTravailler">
          <div className="maFaconDeTravailler__container">
            <MaFaconDeTravailler />
            <CarousselDogPictures />
          </div>
        </div>
        <SuperServices />
        <ContactHelpSection />
        <Newsletter />
        <VosAvis />
        <Envie />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
