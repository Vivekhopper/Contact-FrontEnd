import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddContacts = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneno: "",
    address: "",
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        "http://localhost:5050/contact/add-contact",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Contact Added Successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Error adding contact");
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("No response received from server");
      } else {
        console.error("Error message:", error.message);
        toast.error("Error adding contact");
      }
    }
  };
  return (
    <div   className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 md:p-8 h-full mx-auto sm:h-full md:h-full">
      <h2 className="text-2xl font-bold text-center mb-6">Add Contact</h2>
      <form onSubmit={handleSubmit} className="resCss box-border space-y-6 h-full sm:h-full sm:box-border md:h-full md:box-border" >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="phoneno" className="block text-sm font-medium text-gray-700">
            Phone No
          </label>
          <input
            type="text"
            id="phoneno"
            name="phoneno"
            placeholder="Enter Mobile No"
            value={data.phoneno}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContacts;
