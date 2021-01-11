import React, { useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CCol, CRow, CDataTable, CButton, CBadge } from '@coreui/react'
import { getHistoriesPerDevice } from '../../redux/actions/history'
import { useSelector, useDispatch } from "react-redux"
import Alert from '../Alert/Alerts'
const ModalHistory = ({ type, title, size, color, deviceId }) => {
    const dispatch = useDispatch();
    const historyListPerDevice = useSelector(state => state.historyListPerDevice);
    const { loading, data, error } = historyListPerDevice
    console.log(loading);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    }
    const fieldsHistories = [
        { key: 'user', _style: { width: '20%' } },
        { key: 'state', _style: { width: '20%' } },
        { key: 'createdAt', _style: { width: '20%' } },
    ]
    return (
        <>
            <CButton
                onClick={() => {
                    dispatch(getHistoriesPerDevice(deviceId))
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
                    {loading ? (
                        ""
                    ) : error ? (
                        <Alert color="danger" msg={error.message} />
                    ) : (
                                <CRow>
                                    <CCol sm={12} >
                                        <span className="h4">History of device</span>
                                    </CCol>
                                    <CCol sm={12}>
                                        <CDataTable
                                            items={data && data.data}
                                            fields={fieldsHistories}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'state':
                                                    (item) => (
                                                        <td>
                                                            {item.state === true ? <CBadge color="success">
                                                                Bật
                                                                </CBadge> :
                                                                <CBadge color="danger">Tắt</CBadge>}
                                                        </td>
                                                    )
                                            }}
                                        />
                                    </CCol>
                                </CRow>
                            )}
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

export default ModalHistory
