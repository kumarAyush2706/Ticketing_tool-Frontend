import React from "react";
import logo from "../../assets/logo.jpg"
import { FaUser } from "react-icons/fa6";
import "./Header.css"

const Header = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          MyTicket
          <img src={logo}></img>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." className="search-box" />
        </div>
        <div className="user-name">
          <FaUser className="user-icon" />
          John Doe
        </div>
      </nav>
    </div>
  );
};

export default Header;
