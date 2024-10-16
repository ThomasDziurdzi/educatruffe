import Email from "../svg/Email";
import Phone from "../svg/Phone";
import "./Adress.css";

function Adress() {
  return (
    <section className="adress__container">
      <div className="adress__content">
        <div className="adress">
          <h2>Adresse</h2>
          <p>32 rue du p'tit golf, 69000 Trifouilly-les-Oiles</p>
        </div>
        <div className="schedule">
          <h2>Horaires</h2>
          <p>
            Du mardi au dimanche: <br />
            08:00 - 20:00
          </p>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          <div>
            <Phone width="18" height="18" />
            06.01.02.03.04
          </div>
          <div className="adress__email">
            <Email width="18" height="18" />
            johnDoe@educatruffe.fr
          </div>
        </div>
      </div>
      <div className="adress__border">{null}</div>
    </section>
  );
}
export default Adress;
