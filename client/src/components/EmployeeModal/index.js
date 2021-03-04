import React from "react";
import "./EmployeeModal.scss";
import avatarPlaceholder from "../../assets/images/avatar_placeholder.png";
import { VscChromeClose } from "react-icons/vsc";
import StateSelect from "../StateSelect";
import axios from "axios";
import { connect } from "react-redux";
import { setEmployee, getEmployees } from "../../redux/actions/employeeActions";

function EmployeeModal(props) {
  const inputChangeHandler = (e) => {
    props.setEmployee({
      ...props.selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    props.setEmployee({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      photo: "",
      notes: "",
    });
    if (props.modalType === "New Employee") {
      props.closeAddModal();
    } else {
      props.closeEditModal();
    }
  };

  const handleSubmit = (e, employeeId) => {
    e.preventDefault();
    if (props.modalType === "New Employee") {
      axios
        .post(
          "https://codechallenge.rivet.work/api/v1/profile",
          props.selectedEmployee,
          {
            headers: {
              token:
                "2KsbQmoHHuzL2m6RpW4GWPJ3hTTdvVCXBRrEPuKGUnvxGycAEMdCJ9xTBLjpAH8C",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          props.getEmployees();
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `https://codechallenge.rivet.work/api/v1/profile/${employeeId}`,
          props.selectedEmployee,
          {
            headers: {
              token:
                "2KsbQmoHHuzL2m6RpW4GWPJ3hTTdvVCXBRrEPuKGUnvxGycAEMdCJ9xTBLjpAH8C",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          props.getEmployees();
          closeModal();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="aem">
      <div className="aem-content">
        <div className="aem-header">
          <p className="aem-title">{props.modalType}</p>
          <div className="aem-close-icon" onClick={closeModal}>
            <VscChromeClose />
          </div>
        </div>
        <div className="aem-content-bottom">
          <div className="aem-img-div">
            <img
              src={
                props.modalType === "New Employee"
                  ? avatarPlaceholder
                  : props.selectedEmployee.photo
              }
              className="aem-img-placeholder"
            />
            <button className="aem-img-btn">{props.photoButton}</button>
          </div>
          <form
            className="aem-form"
            onSubmit={(e) => handleSubmit(e, props.selectedEmployee.id)}
          >
            <div className="aem-input-group">
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="first_name"
                  value={props.selectedEmployee.first_name}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="last_name"
                  value={props.selectedEmployee.last_name}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="aem-input-group">
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="email"
                  value={props.selectedEmployee.email}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="phone"
                  value={props.selectedEmployee.phone}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="aem-input-group">
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="address">
                  Address
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="address"
                  value={props.selectedEmployee.address}
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="city">
                  City
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="city"
                  value={props.selectedEmployee.city}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="aem-input-group"></div>
            <div className="aem-input-group">
              <div className="aem-input-div-shrink">
                <label className="aem-form-label" htmlFor="state">
                  State
                </label>
                <StateSelect
                  employee={props.selectedEmployee}
                  setEmployee={props.setEmployee}
                />
              </div>
              <div className="aem-input-div-shrink">
                <label className="aem-form-label" htmlFor="zip">
                  Zip Code
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="zip"
                  value={props.selectedEmployee.zip}
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className="aem-notes-input-group">
              <label className="aem-form-label" htmlFor="notes">
                Notes
              </label>
              <input
                className="aem-input-tall"
                type="text"
                name="notes"
                value={props.selectedEmployee.notes}
                onChange={inputChangeHandler}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="aem-form-btn">{props.submitButton}</button>
            </div>
          </form>
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

export default connect(mapStateToProps, { setEmployee, getEmployees })(
  EmployeeModal
);
