import React from 'react'
import ModalByRole from "./ModalByRole";
import FormSchedule from "../../containers/FormSubmit/FormSchedule";

const ModalSchedule = ({ role }) =>
{
    return (
      <ModalByRole
        type="Add schedule"
        title="Schedule info"
        body={<FormSchedule />}
        size="lg"
        color="warning"
        role={role}
      />
    );
}

export default ModalSchedule
