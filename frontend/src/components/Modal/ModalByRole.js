import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";

const ModalByRole = ({ type, title, body, size, color, role }) =>
{
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      <CButton disabled={role} onClick={toggle} className="mr-1" color={color}>
        {type}
      </CButton>
      <CModal show={modal} onClose={toggle} size={size}>
        <CModalHeader closeButton>{title}</CModalHeader>
        <CModalBody>{body}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ModalByRole;
