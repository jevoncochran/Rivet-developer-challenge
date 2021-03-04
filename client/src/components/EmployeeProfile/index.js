import React from "react";
import "./EmployeeProfile.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdBackspace } from "react-icons/md";
import { connect } from "react-redux";

function EmployeeProfile(props) {
  return (
    <div className="ep">
      <div className="ep-route-div">
        <div
          className="ep-back-icon"
          onClick={() => props.history.push("/employees")}
        >
          <MdBackspace />
        </div>
        <p className="ep-text-large">Back To Employees</p>
      </div>
      <div className="ep-profile">
        <img src={props.selectedEmployee.photo} alt="employee" />
        <div className="ep-text">
          <div className="ep-name-div">
            <h1>{`${props.selectedEmployee.first_name} ${props.selectedEmployee.last_name}`}</h1>
            <div className="ep-name-div-icon">
              <FaMapMarkerAlt />
            </div>
            <p>{`${props.selectedEmployee.city}, ${props.selectedEmployee.state}`}</p>
          </div>
          <div className="ep-contact-container">
            <p className="ep-text-large">CONTACT INFORMATION</p>
            <div className="ep-contact-div">
              <p className="ep-contact-category">Phone:</p>
              <p className="ep-text-regular">{props.selectedEmployee.phone}</p>
            </div>
            <div className="ep-contact-div">
              <p className="ep-contact-category">Address:</p>
              <div>
                <p className="ep-text-regular">
                  {props.selectedEmployee.address}
                </p>
                <p className="ep-text-regular">{`${props.selectedEmployee.city}, ${props.selectedEmployee.state} ${props.selectedEmployee.zip}`}</p>
              </div>
            </div>
            <div className="ep-contact-div">
              <p className="ep-contact-category">Email:</p>
              <p className="ep-text-regular">{props.selectedEmployee.email}</p>
            </div>
          </div>
          <div className="ep-notes-container">
            <p className="ep-text-large">NOTES</p>
            <p className="ep-notes-text ep-text-regular">
              {props.selectedEmployee.notes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedEmployee: state.selectedEmployee,
  };
};

export default connect(mapStateToProps, {})(EmployeeProfile);
