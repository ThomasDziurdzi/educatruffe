import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Logo from "../svg/Logo";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header__logo">
        <Link to="/">
          <Logo width={75} height={75} className="logo" />
        </Link>
        <Link to="/">
          <h1>éducatruffe</h1>
        </Link>
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
