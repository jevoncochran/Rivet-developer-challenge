import React, { useState, useEffect } from "react";
import "./EmployeeModal.scss";
import avatarPlaceholder from "../../assets/images/avatar_placeholder.png";
import { VscChromeClose } from "react-icons/vsc";
import StateSelect from "../StateSelect";
import axios from "axios";
import { connect } from "react-redux";
import {
  setEmployee,
  getEmployees,
  changeEmployeeUpdateToggle,
} from "../../redux/actions/employeeActions";
import { storage } from "../../firebase";

function EmployeeModal(props) {
  const [file, setFile] = useState(null);

  // Profile pic url from Firebase storage
  const [profilePicUrl, setProfilePicUrl] = useState(avatarPlaceholder);

  // Status of image upload to Firebase storage
  const [uploadProgress, setUploadProgress] = useState(0);

  // Create variable to reference image file input
  // Open image input file on click event
  let imgInput = "";
  const imgInputClick = (e) => {
    e.preventDefault();
    imgInput.click();
  };

  // update Redux state for employee on input onChange event
  const inputChangeHandler = (e) => {
    props.setEmployee({
      ...props.selectedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  // Save selected file in component state on image file input onChange event
  const imgInputChangeHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      // Upload image file to Firebase storage
      const uploadTask = storage.ref(`profile-pics/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        // Get image url from Firebase storage
        // Update component state with image url
        () => {
          storage
            .ref("profile-pics")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setProfilePicUrl(url);
            });
        }
      );
    }
  }, [file]);

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
      // Make .post call to add new employee to database
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
          props.getEmployees().then(() => {
            props.changeEmployeeUpdateToggle();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Make .put call to update employee
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
          props.getEmployees().then(() => {
            props.changeEmployeeUpdateToggle();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    closeModal();
  };

  // Render uploaded employee image on modal
  useEffect(() => {
    if (profilePicUrl !== avatarPlaceholder) {
      props.setEmployee({ ...props.selectedEmployee, photo: profilePicUrl });
    }
  }, [profilePicUrl]);

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
            <div
              style={{
                backgroundImage:
                  props.modalType === "New Employee"
                    ? `url(${profilePicUrl})`
                    : profilePicUrl !== avatarPlaceholder
                    ? `url(${profilePicUrl})`
                    : !props.selectedEmployee.photo
                    ? `url(${avatarPlaceholder})`
                    : `url(${props.selectedEmployee.photo})`,
                backgroundSize: profilePicUrl ? "cover" : "auto",
              }}
              className="aem-img"
            ></div>
            <button className="aem-img-btn" onClick={imgInputClick}>
              {props.photoButton}
            </button>
            <input
              className="aem-pic-input"
              type="file"
              id="prof-pic-file"
              name="file"
              placeholder="test"
              onChange={imgInputChangeHandler}
              ref={(ref) => (imgInput = ref)}
            />
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

export default connect(mapStateToProps, {
  setEmployee,
  getEmployees,
  changeEmployeeUpdateToggle,
})(EmployeeModal);
