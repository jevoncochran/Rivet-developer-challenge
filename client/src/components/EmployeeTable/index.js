import React, { useEffect, useState } from "react";
import "./EmployeeTable.scss";
import {
  AiOutlineSearch,
  AiFillProfile,
  AiFillCaretDown,
} from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { RiAddFill } from "react-icons/ri";
import { connect } from "react-redux";

import { getEmployees, setEmployee } from "../../redux/actions/employeeActions";

function EmployeeTable(props) {
  const [employees, setEmployees] = useState([]);

  const [hoveredEmployee, setHoveredEmployee] = useState(null);

  const [nameSortActive, setNameSortActive] = useState(false);

  const [emailSortActive, setEmailSortActive] = useState(false);

  const [query, setQuery] = useState(null);

  const [searchActive, setSearchActive] = useState(false);

  // Save clicked employee object to Redux state
  // Render modal for editing employee details
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

  // Push to employee route, render EmployeeProfile
  const renderProfile = (employee, employeeId) => {
    props.setEmployee(employee);
    props.history.push(`/employee/${employeeId}`);
  };

  // Sort employees in alphabetical order by last name
  const nameSort = () => {
    setEmployees((prev) => {
      return [...prev].sort((a, b) => {
        if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1;
        if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1;
        return 0;
      });
    });
    setNameSortActive(true);
    setEmailSortActive(false);
  };

  // Sort employees in alphabetical order by email
  const emailSort = () => {
    setEmployees((prev) => {
      return [...prev].sort((a, b) => {
        if (a.email.toLowerCase() < b.email.toLowerCase()) return -1;
        if (a.last_name.toLowerCase() > b.email.toLowerCase()) return 1;
        return 0;
      });
    });
    setEmailSortActive(true);
    setNameSortActive(false);
  };

  // Use employee.id to highlight row for that employee on hover
  const employeeHighlight = (employeeId) => {
    setHoveredEmployee(employeeId);
  };

  // Remove highlight when no employee is being hovered over
  const noHighlight = () => {
    setHoveredEmployee(null);
  };

  const employeeSearch = (query) => {
    let filteredEmployees = [];
    if (query === "") {
      filteredEmployees = props.employees;
    } else {
      props.employees.forEach((employee) => {
        if (
          employee.last_name.toLowerCase().includes(query.toLowerCase()) ||
          employee.first_name.toLowerCase().includes(query.toLowerCase()) ||
          employee.email.toLowerCase().includes(query.toLowerCase())
        ) {
          filteredEmployees.push(employee);
        }
      });
    }
    filteredEmployees.sort((a, b) => {
      if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1;
      if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1;
      return 0;
    });
    setEmployees(filteredEmployees);
  };

  const closeSearchInput = () => {
    props.getEmployees();
    setEmployees(props.employees);
    setSearchActive(false);
    setQuery("");
  };

  // Make .get call to retrieve employees
  // On initial render and each time an employee is added or updated
  useEffect(() => {
    props.getEmployees();
    setEmployees(props.employees);
    setNameSortActive(false);
    setEmailSortActive(false);
    console.log("useEffect with props.employeeUpdates as dependency ran");
    console.log("props.employees when useEffect runs: ", props.employees);
  }, [props.employeeUpdateToggle]);

  useEffect(() => {
    if (query !== null) {
      employeeSearch(query);
    }
  }, [query]);

  return (
    <div className="et">
      <div className="et-top">
        <div className="et-search-div">
          <div className="et-search-icon" onClick={() => setSearchActive(true)}>
            {!searchActive && <AiOutlineSearch />}
          </div>
          <div className="et-search-icon" onClick={closeSearchInput}>
            {searchActive && <VscChromeClose />}
          </div>
          {!searchActive && <p>Search</p>}
          {searchActive && (
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
          )}
        </div>
        <button className="et-add-employee-btn" onClick={props.openAddModal}>
          <div>
            <RiAddFill />
          </div>
        </button>
      </div>
      <table className="et-tbl" onMouseLeave={noHighlight}>
        <tr onMouseEnter={noHighlight}>
          <th onClick={nameSort} className="et-th-cell-div">
            <div>
              Name
              <span
                className="et-th-sort-icon"
                style={{ display: nameSortActive ? "inline" : "none" }}
              >
                <AiFillCaretDown />
              </span>
            </div>
          </th>
          <th onClick={emailSort} className="et-th-cell-div">
            <div>
              Email
              <span
                className="et-th-sort-icon"
                style={{ display: emailSortActive ? "inline" : "none" }}
              >
                <AiFillCaretDown />
              </span>
            </div>
          </th>
          <th>Phone</th>
          <th></th>
        </tr>
        {employees.map((employee) => (
          <tr
            key={employee.id}
            onMouseEnter={() => employeeHighlight(employee.id)}
            style={{
              backgroundColor:
                hoveredEmployee === employee.id ? "#F9F9FB" : "#fff",
            }}
          >
            <td>
              <div
                className="et-tbl-name-cell"
                onClick={() => renderProfile(employee, employee.id)}
              >
                {employee.photo ? (
                  <img
                    src={employee.photo}
                    alt={`${employee.first_name} ${employee.last_name}`}
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
              <div className="et-tbl-icon-cell-div">
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
    selectedEmployee: state.selectedEmployee,
    nameSortActive: state.nameSortActive,
    emailSortActive: state.emailSortActive,
    employeeUpdateToggle: state.employeeUpdateToggle,
  };
};

export default connect(mapStateToProps, {
  getEmployees,
  setEmployee,
})(EmployeeTable);
