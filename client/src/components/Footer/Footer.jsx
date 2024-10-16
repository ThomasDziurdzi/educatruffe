// import { useState, useEffect } from "react";
// import Footer1195 from "../svg/Footer1195";
// import Footer2520 from "../svg/Footer2520";
// import Footer360 from "../svg/Footer360";
// import runningDog from "../../assets/images/runningdog 1.png";
import "./Footer.css";
import Facebook from "../svg/Facebook";
import Instagram from "../svg/Instagram";
import RunningGoodBoy from "../svg/RunnigGoodBoy";
// import FooterResponsive from "../svg/FooterResponsive";

function Footer() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <footer className="footer">
      {/* <Footer2520 /> */}
      {/* <Footer360 /> */}
      <div className="footer__container">
        <RunningGoodBoy />
        <div className="footer__socials">
          <p className="footer__socials__paragraph">SUIVEZ NOUS!</p>
          <Instagram />
          <Facebook />
        </div>
      </div>
      {/* {windowWidth < 640 ? <FooterResponsive /> : <div>{null}</div>} */}
    </footer>
  );
}

export default Footer;
