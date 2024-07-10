import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCubesStacked,
  FaAddressCard,
  FaRegAddressCard,
  FaPowerOff,
} from "react-icons/fa6";

const Sidebar = () => {
  const [active, setActive] = useState(null);

  return (
    <div className=" flex p-2 flex-col md:flex-col bg-gray-800 text-white md:p-0 md:h-full ">
      <div className="flex mt-2 md:flex-col justify-around md:items-center pl-6  w-full md:space-y-4 space-y-2 md:space-y-0 md:space-x-0 space-x-4 md:space-x-0">
        <div
          className={`options ${
            active === 0 ? "bg-gray-700" : ""
          }   flex flex-col items-center md:flex-row md:items-center p-2 rounded-lg`}
          onClick={() => setActive(0)}
        >
          <Link
            to="/#"
            className="links flex flex-col md:flex-row items-center w-full"
          >
            <FaUser className="icon mb-1 md:mb-0 md:mr-2 text-2xl md:text-base" />
            <span className="text-xs md:text-sm">Profile</span> 
          </Link>
        </div>
        <div
          className={`options ${
            active === 1 ? "bg-gray-700" : ""
          } flex flex-col items-center md:flex-row md:items-center p-2 rounded-lg`}
          onClick={() => setActive(1)}
        >
          <Link
            to="/dashboard"
            className="links flex flex-col md:flex-row items-center w-full"
          >
            <FaAddressCard className="icon mb-1 md:mb-0 md:mr-2 text-2xl md:text-base" />
            <span className="text-xs md:text-sm">Contacts</span>
          </Link>
        </div>
        <div
          className={`options ${
            active === 2 ? "bg-gray-700" : ""
          } flex flex-col items-center md:flex-row md:items-center p-2 rounded-lg`}
          onClick={() => setActive(2)}
        >
          <Link
            to="/dashboard/add-contact"
            className="links flex flex-col md:flex-row items-center w-full"
          >
            <FaRegAddressCard className="icon mb-1 md:mb-0 md:mr-2 text-2xl md:text-base" />
            <span className="text-xs md:text-sm">Add Contact</span>
          </Link>
        </div>
        <div
          className={`options ${
            active === 3 ? "bg-gray-700" : ""
          } flex flex-col items-center md:flex-row md:items-center p-2 rounded-lg`}
          onClick={() => setActive(3)}
        >
          <Link
            to="/logout"
            className="links flex flex-col md:flex-row items-center w-full"
          >
            <FaPowerOff className="icon mb-1 md:mb-0 md:mr-2 text-2xl md:text-base" />
            <span className="text-xs md:text-sm">Exit</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
