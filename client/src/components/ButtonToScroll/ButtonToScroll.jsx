import { useState, useEffect } from "react";
import ScrollTop from "../svg/ButtonToScroll";

import "./ButtonToScroll.css";

function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScrollVisibility);
    return () => {
      window.removeEventListener("scroll", handleScrollVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showButton && (
        <div className="scrollToTop">
          <ScrollTop
            className="scrollToTop__button"
            height={64}
            width={64}
            onClick={handleScrollToTop}
          />
        </div>
      )}
    </div>
  );
}

export default ScrollToTopButton;
