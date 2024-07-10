import React, { createContext, useEffect, useState } from "react";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./Pages/Dashboard";
import Contacts from "./components/Contacts";
import Addcontacts from "./components/Addcontacts";
import EditContact from "./components/EditContact";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./Pages/NotFound";

export const UserContext = createContext(null);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/dashboard",
    element: <ProtectedRoute> <Dashboard /></ProtectedRoute>,
    children:[
      {
        index:true,
        element:<Contacts/>
      },
      {
        path:"/dashboard/add-contact",
        element:<Addcontacts/>
      },
      {
        path:"/dashboard/edit-contact/:id",
        element:<EditContact/>
      },
    ]
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path:"*",
    element:<NotFound/>
  }
]);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get("http://localhost:5050/contact/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
