import React from "react";
import "./HeaderBar.scss";
import { FaUsers } from "react-icons/fa";

export default function HeaderBar() {
  return (
    <div className="hb">
      <div className="hb-employee-icon">
        <FaUsers />
      </div>
      <div className="hb-vert-separator"></div>
      <h1 className="hb-title">Employees</h1>
    </div>
  );
}
