import Header from "@/components/common/Header";
import Sidebar from "@/components/core/Dashboard/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="md:w-64 fixed">
        <Sidebar />
      </div>
      <div className="md:ml-64">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
