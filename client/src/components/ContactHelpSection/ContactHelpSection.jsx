
import {useGSAP} from "@gsap/react"
import { Link } from "react-router-dom";
import "./ContactHelpSection.css";
import Calendar from "./svg/Calendar";
import Msg from "./svg/Msg";
import Msn from "./svg/Msn";
import useAnimation from "../../hooks/useAnimation";

function ContactHelpSection() {
    const { slideInLeft } = useAnimation();
    const { slideInRight } = useAnimation();
    const { slideInTop } = useAnimation();

    useGSAP(() => {
        slideInLeft(".contactHelpSection__title");
      }, []);

      useGSAP(() => {
        slideInRight(".contactHelpSection__button");
      }, []);

      useGSAP(() => {
        slideInTop(".contactHelpSection__container");
      }, []);
  return (
    <div className="contactHelpSection__section">
      <h2 className="contactHelpSection__title">Comment ça marche ?</h2>
      <button type="button" className="contactHelpSection__button">
        Contactez-moi !
      </button>
      <div className="contactHelpSection__article">
        <div className="contactHelpSection__container">
          <div className="rondnoir1">
            <Msg className="Msg" />
          </div>
          <h3>Contact</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta fugit
            rem aliquam maxime repellat nihil velit impedit ab animi illum modi
            asperiores incidunt accusantium praesentium tenetur, deserunt
            reprehenderit alias dolore.
          </p>
          <Link to="/contact">
            <p className="contactHelpSection__lien">Formulaire de contact</p>
          </Link>
        </div>
        <div className="contactHelpSection__container">
          <div className="rondnoir2">
            <Msn className="Msn" />
          </div>
          <h3>Rencontre</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
            consequatur sunt quasi nisi! Impedit ab at tempore laudantium quis
            fugiat molestias neque quaerat, adipisci deleniti, doloribus
            reiciendis rem. Veniam, eius!
          </p>
          <Link to="/about">
            <p className="contactHelpSection__lien">En savoir plus</p>
          </Link>
        </div>
        <div className="contactHelpSection__container">
          <div className="rondnoir3">
            <Calendar className="Calendar" />
          </div>
          <h3>Rendez-vous</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Aspernatur, consequuntur sint eum debitis nemo assumenda ipsa in
            maiores, sequi illum cum, earum soluta eligendi sunt explicabo
            officia temporibus unde nulla?
          </p>
          <Link to="/service">
            <p className="contactHelpSection__lien">Planning en ligne</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactHelpSection;
