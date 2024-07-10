import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headCells: {
    style: {
      fontSize: "20px",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      fontSize: "11px",
      fontWeight: 500,
    },
  },
};

const MySwal = withReactContent(Swal);

function Contacts() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://contact-backend-ochre.vercel.app/contact/contact/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setContacts(res.data.contacts);

            MySwal.fire({
              title: "Deleted!",
              text: "Your contact has been deleted.",
              icon: "success",
            });
          })
          .catch(() => {
            MySwal.fire({
              title: "Error!",
              text: "An error occurred while deleting the contact.",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phoneno,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="ticon text-blue-500" />
          </Link>
          <FaRegTrashCan
            className="ticon2 cursor-pointer ml-2 text-red-500"
            onClick={() => deleteRecord(row._id)}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5050/contact/contacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContacts(response.data.contacts);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error("No response received from server");
        } else {
          toast.error("Error fetching contacts");
        }
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [token, navigate]);

  return (
    <div className="mx-auto p-4 w-full md:w-4/4 lg:w-6/6 sm:w-6/6">
      {loading ? (
        <div className="flex items-center justify-center">
          <CircleLoader loading={loading} size={50} color="#4F46E5" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
            striped
            highlightOnHover
            className="w-full border rounded-lg tablecss"
          />
        </div>
      )}
    </div>
  );
}

export default Contacts;
