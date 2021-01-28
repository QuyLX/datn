import React, { useState } from 'react'
import { CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react'
import ListUserView from '../../containers/FormSubmit/ListUserView'
import { getUsersInused } from '../../redux/actions/user'
import { useSelector, useDispatch } from "react-redux"
import Alert from '../Alert/Alert'
const ModalUser = ({ type, title, size, color, deviceId }) => {
    const dispatch = useDispatch();
    const userListPerDevice = useSelector(state => state.userListPerDevice);
    const { loading: loadUsers, data: dataUsers, error: errUsers } = userListPerDevice
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <>
            <CButton
                onClick={() => {
                    dispatch(getUsersInused(deviceId))
                    toggle()
                }}
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
                    {loadUsers ? (
                        ""
                    ) : errUsers ? (
                        <Alert color="danger" msg={errUsers.message} />
                    ) : (
                                <ListUserView data={dataUsers} />)}
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={toggle}
                    >Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ModalUser
