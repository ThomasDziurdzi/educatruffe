import {useGSAP} from "@gsap/react"
import { dog1, dog2, dog3 } from "./Import";
import "./CarousselDogPictures.css";
import useAnimation from "../../hooks/useAnimation";

function CarousselDogPictures() {
    const { appear } = useAnimation();

    useGSAP(() => {
        appear(".caroussel__container");
      }, []);
  return (
    <div className="caroussel">
      <div className="caroussel__container">
        <img className="dogImg" src={dog1} alt="" />
        <img src={dog2} alt="" />
        <img src={dog3} alt="" />
      </div>
    </div>
  );
}

export default CarousselDogPictures;
