import React, { useContext } from "react";
import { UserContext } from "../App";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
const MySwal = withReactContent(Swal);
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const { setUser } = useContext(UserContext);
  MySwal.fire({
    title: "Are you sure?",
    text: "Do You Want to Exit",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes I Want!",
  }).then((result) => {
    if (result.isConfirmed) {
      handleLogout();
    }
    else{
      navigate('/dashboard')
    }
  });
};

export default Logout;
