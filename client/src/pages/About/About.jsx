import "./About.css";
import Grillage2 from "../../components/svg/Grillage2";
import camille from "../../assets/images/camille.jpg";
import Circle from "../../components/svg/Circle";
import CoeurVert from "../../components/svg/CoeurVert";
import Star from "../../components/svg/Star";
import Zigouigoui from "../../components/svg/Zigouigoui";

function About() {
  return (
    <div className="about__container">
      <div className="about__img">
        <Circle className="circle" />
        <img
          className="camille"
          src={camille}
          alt="camile avec son doggo chienchien "
        />
        <CoeurVert className="coeurVert" />
        <Star className="stari" />
      </div>
      <div className="about__text">
        <Grillage2 />
        <h2 className="about__title">Mon Projet</h2>
        <p className="about__paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla
          fringilla mattis. Sed in dolor sed orci sodales pulvinar. Etiam non mi
          et quam convallis ultrices. Morbi magna orci, posuere non dapibus vel,
          tempor et eros. Donec quis urna ut leo sodales pretium sit amet sed
          nibh. Fusce ornare nulla sed accumsan ullamcorper. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Aspernatur dolores iusto
          debitis possimus eligendi eum alias blanditiis similique recusandae
          voluptatum ratione dignissimos, fuga quibusdam delectus distinctio
          atque, quia error nihil!
        </p>
        <p className="about__paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
          officiis, ab dolore deserunt voluptates, commodi quae nulla at eveniet
          quaerat assumenda temporibus voluptatibus natus consectetur distinctio
          error sapiente? Ut, voluptates. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Voluptatem quae, pariatur molestiae provident fuga,
          aperiam quaerat inventore vero consequatur accusamus molestias
          similique unde consequuntur voluptate delectus soluta consectetur in
          reprehenderit.
        </p>
        <Star className="staros" />
        <Zigouigoui className="zigouigoui" />
      </div>
    </div>
  );
}

export default About;
