import React, { useState, useEffect } from "react";
import "./EmployeeTable.scss";
import { AiOutlineSearch, AiFillProfile } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { RiAddFill } from "react-icons/ri";
import axios from "axios";

export default function EmployeeTable(props) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("https://codechallenge.rivet.work/api/v1/profiles", {
        headers: {
          token:
            "2KsbQmoHHuzL2m6RpW4GWPJ3hTTdvVCXBRrEPuKGUnvxGycAEMdCJ9xTBLjpAH8C",
        },
      })
      .then((res) => {
        console.log(res.data);
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <button className="et-add-employee-btn" onClick={props.openModal}>
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
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <div className="et-tbl-name-cell">
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
              <div className="et-tbl-icon">
                <AiFillProfile />
              </div>
              <div className="et-tbl-icon">
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
