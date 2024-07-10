import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditContact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Extracting the contact ID from the URL parameters
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `https://contact-backend-ochre.vercel.app/contact/update-contact/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Contact Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Error updating contact");
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("No response received from server");
      } else {
        console.error("Error message:", error.message);
        toast.error("Error updating contact");
      }
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://contact-backend-ochre.vercel.app/contact/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { name, email, phoneno, address } = response.data.contact;
        setData({ name, email, phoneno, address });
        console.log(response);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("No response received from server");
        } else {
          toast.error("Error fetching contact details");
        }
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
   
    <div  style={{height:"100%"}} className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8 h-full mx-auto sm:h-full md:h-full">
    <h2 className="text-2xl font-bold mb-6 text-center">Edit Contact</h2>
        <form onSubmit={handleSubmit}  className="resCss box-border space-y-6 h-full sm:h-full sm:box-border md:h-full md:box-border" style={{height:"100%"}}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              placeholder="Enter Name"
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneno"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone No
            </label>
            <input
              type="text"
              id="phoneno"
              name="phoneno"
              placeholder="Enter mobile no"
              value={data.phoneno}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={data.address}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    
  );
};

export default EditContact;
