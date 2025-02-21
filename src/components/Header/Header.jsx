import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { FaUser } from "react-icons/fa6";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const URL = "http://localhost:3000/api/me";
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const response = await fetch(URL, options);
        const data = await response.json();
        if (data.success) {
          setUser(data.user); // ✅ User comes from cookie
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      const URL = "http://localhost:3000/api/logout";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      const response = await fetch(URL, options);
      const data = await response.json();
      if (data.success) {
        alert("User logged out");
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          MyTicket
          <img src={logo}></img>
        </div>
        {/* <div className="search">
          <input type="text" placeholder="Search..." className="search-box" />
        </div> */}
        <div className="user-name">
          <FaUser className="user-icon" />
          {user?.name}
          <button className="Logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
