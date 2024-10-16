import { gsap } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const useAnimation = () => {
  // Utilisation du Hook personnalisé sur le composant. Ex :
  //   useGSAP(() => {
  //     appear(".classeComposant");
  // }, []);

  const slideInTop = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        y: 200,
      },
      {
        opacity: 1,
        y: 0,
        delay: delay || 0.4,
        duration: duration || 1,
        scrollTrigger: {
          trigger: elem,
          start: "top 100%",
          end: "bottom center",
        //   markers: true,
        },
      }
    );
  };

  const slideInLeft = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        delay: delay || 0.4,
        duration: duration || 1,
        scrollTrigger: {
          trigger: elem,
          start: "top 70%",
          end: "bottom center",
          markers: false,
        },
      }
    );
  };

  const slideInRight = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
        x: 200,
      },
      {
        opacity: 1,
        x: 0,
        delay: delay || 0.2,
        duration: duration || 1,
        scrollTrigger: {
          trigger: elem,
          start: "top 70%",
          end: "bottom center",
          // markers: true
        },
      }
    );
  };

  const appear = (elem, delay, duration) => {
    gsap.fromTo(
      elem,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: delay || 0.4,
        duration: duration || 1,
        scrollTrigger: {
          trigger: elem,
          start: "top 70%",
          end: "bottom center",
          markers: false,
        },
      }
    );
  };

  return {
    slideInTop,
    slideInLeft,
    slideInRight,
    appear,
  };
};

export default useAnimation;