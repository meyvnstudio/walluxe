import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaChartBar,
  FaFolder,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import "./../../style/admin.scss";

const Sidebar = ({ isCollapsed, toggleSidebar, handleLogout }) => {
  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button onClick={toggleSidebar} className="collapse-btn">
          Iwm
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/admin">
              <FaTachometerAlt />
              {!isCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="/admin/analytics">
              <FaChartBar />
              {!isCollapsed && <span>Analytics</span>}
            </a>
          </li>
          <li>
            <a href="/admin/content">
              <FaFolder />
              {!isCollapsed && <span>Files</span>}
            </a>
          </li>
          <li>
            <a href="/admin/account">
              <FaUser />
              {!isCollapsed && <span>Account</span>}
            </a>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
