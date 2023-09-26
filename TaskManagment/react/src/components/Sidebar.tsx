import React, { useState } from "react";
import Logo from "../assets/img/logo.png";
import Menu from "./Menu";
import MenuIcon from "../assets/img/menu.svg";

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
          <img src={Logo} className="sidebar__logo" />
          <Menu />
        </div>
      </div>
      {menuOpen && <div className="popup-overlay" onClick={handleClick}></div>}
    </>
  );
}
