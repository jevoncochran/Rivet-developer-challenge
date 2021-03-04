import React, { useEffect } from "react";
import "./EmployeeTable.scss";
import { AiOutlineSearch, AiFillProfile } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { RiAddFill } from "react-icons/ri";
import { connect } from "react-redux";

import { getEmployees, setEmployee } from "../../redux/actions/employeeActions";

function EmployeeTable(props) {
  const editEmployee = (row) => {
    props.setEmployee({
      first_name: row.first_name,
      last_name: row.last_name,
      phone: row.phone,
      email: row.email,
      address: row.address,
      city: row.city,
      state: row.state,
      zip: row.zip,
      photo: row.photo,
      notes: row.notes,
      id: row.id,
    });
    props.openEditModal();
  };

  const renderProfile = (employee, employeeId) => {
    props.setEmployee(employee);
    props.history.push(`/employee/${employeeId}`);
  };

  useEffect(() => {
    props.getEmployees();
  }, []);

  return (
    <div className="et">
      <div className="et-top">
        <div className="et-search-div">
          <div className="et-search-icon">
            <AiOutlineSearch />
          </div>
          <p>Search</p>
        </div>
        <button className="et-add-employee-btn" onClick={props.openAddModal}>
          <div>
            <RiAddFill />
          </div>
        </button>
      </div>
      <table className="et-tbl">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
        {props.employees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <div className="et-tbl-name-cell">
                {employee.photo ? (
                  <img
                    src={employee.photo}
                    alt={`${employee.first_name} ${employee.last_name}`}
                    onClick={() => renderProfile(employee, employee.id)}
                  />
                ) : (
                  <div></div>
                )}
                {employee.last_name}, {employee.first_name}
              </div>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td className="et-tbl-icon-cell">
              <div
                className="et-tbl-icon"
                onClick={() => renderProfile(employee, employee.id)}
              >
                <AiFillProfile />
              </div>
              <div
                className="et-tbl-icon"
                onClick={() => editEmployee(employee)}
              >
                <MdModeEdit />
              </div>
              <div className="et-tbl-icon">
                <VscChromeClose />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

export default connect(mapStateToProps, { getEmployees, setEmployee })(
  EmployeeTable
);
