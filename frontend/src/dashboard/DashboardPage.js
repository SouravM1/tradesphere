import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <TopBar />
      <div className="dashboard-container">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
