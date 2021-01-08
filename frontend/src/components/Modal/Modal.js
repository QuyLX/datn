import React, { useState } from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
const Modal = ({type, title, body, size, color}) => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }
    return (
        <>
            <CButton
                onClick={toggle}
                className="mr-1"
                color={color}
            >
                {type}
            </CButton>
            <CModal
                show={modal}
                onClose={toggle}
                size={size}
            >
                <CModalHeader closeButton>{title}</CModalHeader>
                <CModalBody>
                    {body}
                </CModalBody>
                <CModalFooter>
                    <CButton color={color}>{type}</CButton>{' '}
                    <CButton
                        color="secondary"
                        onClick={toggle}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Modal
