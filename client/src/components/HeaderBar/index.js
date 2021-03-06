import React from "react";
import "./HeaderBar.scss";
import { FaUsers } from "react-icons/fa";
import { AiFillFolderOpen } from "react-icons/ai";

export default function HeaderBar(props) {
  return (
    <div className="hb">
      <div className="hb-employee-icon">
        {props.page === "EmployeeList" ? <FaUsers /> : <AiFillFolderOpen />}
      </div>
      <div className="hb-vert-separator"></div>
      <h1 className="hb-title">{props.title} Test</h1>
    </div>
  );
}
