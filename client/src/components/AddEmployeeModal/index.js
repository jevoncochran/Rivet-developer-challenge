import React from "react";
import "./AddEmployeeModal.scss";
import avatarPlaceholder from "../../assets/images/avatar_placeholder.png";
import { VscChromeClose } from "react-icons/vsc";

export default function AddEmployeeModal(props) {
  return (
    <div className="aem">
      <div className="aem-content">
        <div className="aem-header">
          <p className="aem-title">New Employee</p>
          <div className="aem-close-icon" onClick={props.closeModal}>
            <VscChromeClose />
          </div>
        </div>
        <div className="aem-content-bottom">
          <div className="aem-img-div">
            <img src={avatarPlaceholder} className="aem-img-placeholder" />
            <button className="aem-img-btn">Upload Photo</button>
          </div>
          <form className="aem-form">
            <div className="aem-input-group">
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="firstName"
                />
              </div>
              <div className="aem-input-div">
                <label className="aem-form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="lastName"
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
                />
              </div>
            </div>
            <div className="aem-input-group"></div>
            <div className="aem-input-group">
              <div className="aem-input-div-shrink">
                <label className="aem-form-label" htmlFor="state">
                  State
                </label>
                <select
                  style={{ width: "100%", height: "4vh", fontSize: "1.7rem" }}
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="aem-input-div-shrink">
                <label className="aem-form-label" htmlFor="zip">
                  Zip Code
                </label>
                <input
                  className="aem-input-normal-height"
                  type="text"
                  name="zip"
                />
              </div>
            </div>
            <div className="aem-notes-input-group">
              <label className="aem-form-label" htmlFor="notes">
                Notes
              </label>
              <input className="aem-input-tall" type="text" name="notes" />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="aem-form-btn">Create Employee</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
