import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../App";

import "./../../style/admin.scss";

function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={logout}
      />
      <main className={`main-content ${isCollapsed ? "expanded" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
