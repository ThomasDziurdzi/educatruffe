import { Link } from "react-router-dom";
import Mask from "../../assets/images/Mask group.png";
import CoeurVert from "../svg/CoeurVert";
import Os from "../svg/Os";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <div className="pageNotFound__container">
        <div className="pageNotFound__text">
          <h1>
            404 - Page Not Found <Os />
          </h1>
          <p>Oups ! On dirait que cette page a été emportée par Tempete.</p>
          <p>
            Peut-être qu'il a trouvé un os caché quelque part et a décidé de
            faire une pause pour le grignoter ?
          </p>
          <CoeurVert className="coeurVert" />
        </div>
        <div className="pageNotFound__img">
          <img className="flair__mask" src={Mask} alt="" />
          <Link to="/toutouLover">
            <Os />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
