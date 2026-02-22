import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const selected = pathname === "/dashboard" ? 0 : pathname === "/dashboard/orders" ? 1 : pathname === "/dashboard/holdings" ? 2 : pathname === "/dashboard/positions" ? 3 : pathname === "/dashboard/funds" ? 4 : pathname === "/dashboard/apps" ? 6 : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="/logo.png" alt="logo" className="navbar-logo" onError={(e) => { e.target.style.display = "none"; }} />
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard">
              <p className={selected === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard/orders">
              <p className={selected === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard/holdings">
              <p className={selected === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard/positions">
              <p className={selected === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard/funds">
              <p className={selected === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/dashboard/apps">
              <p className={selected === 6 ? activeMenuClass : menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile">
          <div className="avatar">{user?.name?.slice(0, 2).toUpperCase() || "ZU"}</div>
          <p className="username">{user?.email || "USER"}</p>
          <button type="button" className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
