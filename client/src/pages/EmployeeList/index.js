import React, { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import EmployeeTable from "../../components/EmployeeTable";
import AddEmployeeModal from "../../components/AddEmployeeModal";

export default function EmployeeList() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <HeaderBar />
      <EmployeeTable openModal={openModal} />
      {showModal && <AddEmployeeModal closeModal={closeModal} />}
    </div>
  );
}
