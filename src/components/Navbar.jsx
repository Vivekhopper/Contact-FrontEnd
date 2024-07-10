import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-gray-800 text-white relative z-50">
      <div className="logo">
        <Link to="/" className="text-white text-2xl font-bold">
          CONTACTS
        </Link>
      </div>
      <div className={`nav-links fixed md:static top-0 right-0 w-full md:w-auto h-full md:h-auto bg-gray-800 md:bg-transparent flex-col md:flex-row flex md:flex gap-6 items-center transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <Link to="/about" className="text-white text-lg p-4 md:p-0" onClick={toggleMenu}>
          About
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-white text-lg p-4 md:p-0" onClick={toggleMenu}>
              Contact
            </Link>
            <span className="text-white text-lg p-4 md:p-0">Hello, {user.username}</span>
            <Link to="/logout">
              <button className="border border-white text-white py-1 px-3 hover:bg-white hover:text-gray-800 m-4 md:m-0">
                Logout
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white text-lg p-4 md:p-0" onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/register" className="text-white text-lg p-4 md:p-0" onClick={toggleMenu}>
              Register
            </Link>
          </>
        )}
      </div>
      <div className="menu-toggle block md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <FaTimes className="absolute top-4 right-4"/> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
