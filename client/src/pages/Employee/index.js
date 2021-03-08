import React from "react";
import "./Employee.scss";
import HeaderBar from "../../components/HeaderBar";
import EmployeeProfile from "../../components/EmployeeProfile";

export default function Employee(props) {
  return (
    <div className="employee">
      <HeaderBar page="Employee" title="Employee Profile" />
      <EmployeeProfile history={props.history} />
    </div>
  );
}
