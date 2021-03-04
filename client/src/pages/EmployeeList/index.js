import React, { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import EmployeeTable from "../../components/EmployeeTable";
import EmployeeModal from "../../components/EmployeeModal";
import { connect } from "react-redux";
import { setEmployee } from "../../redux/actions/employeeActions";

function EmployeeList(props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const openAddModal = () => {
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
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div>
      <HeaderBar page="EmployeeList" title="Employees" />
      <EmployeeTable
        openAddModal={openAddModal}
        openEditModal={openEditModal}
        history={props.history}
      />
      {showAddModal && (
        <EmployeeModal
          closeAddModal={closeAddModal}
          modalType="New Employee"
          photoButton="Upload Photo"
          submitButton="Create Employee"
        />
      )}
      {showEditModal && (
        <EmployeeModal
          closeEditModal={closeEditModal}
          modalType="Update Employee"
          photoButton="Edit Photo"
          submitButton="Confirm Changes"
        />
      )}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     selectedEmployee: state.selectedEmployee,
//   };
// };

export default connect(null, { setEmployee })(EmployeeList);
