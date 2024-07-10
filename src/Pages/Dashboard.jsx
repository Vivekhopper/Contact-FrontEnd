import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard flex flex-col md:flex-row h-[90vh] w-full">
        <div className="sidebar order-1 md:order-none w-full md:w-1/5 h-auto md:h-full border border-purple-600 bg-gray-800">
          <Sidebar />
        </div>
        <div className="content order-2 w-full md:w-4/5 h-full md:h-full border border-gray-400 flex justify-center p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
