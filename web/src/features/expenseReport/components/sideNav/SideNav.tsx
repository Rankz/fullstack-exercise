import React from "react";
import { NavLink } from "react-router-dom";
import "../../../../App.css";

const SideNav: React.FC = () => {
  return (
    <div className="side-nav">
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/expense-report">Expense Report</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
