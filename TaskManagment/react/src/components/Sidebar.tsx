import { useState } from "react";
import Logo from "../assets/img/logo.png";
import Menu from "./Menu";
import MenuIcon from "../assets/img/menu.svg";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [menuOpen, isMenuOpen] = useState(false);
  const handleClick = () => {
    isMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleClick} className="menu-btn">
        <img src={MenuIcon} />
      </button>
      <div className={`sidebar ${!menuOpen && "sidebar--hidden"}`}>
        <div className="sidebar__container">
          <Link to="/dashboard">
            <img src={Logo} className="sidebar__logo" />
          </Link>
          <Menu />
          <LogoutButton />
        </div>
      </div>
      {menuOpen && <div className="popup-overlay" onClick={handleClick}></div>}
    </>
  );
}
