import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CButton,
    CBadge,
    CSwitch, } from '@coreui/react';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal';
import FormDevice from '../../FormSubmit/FormDevice'
import { useDispatch, useSelector } from 'react-redux';
import { getDevicesInRoom, deleteDevice, controlDevice } from '../../../redux/actions/device'
const Room = ({ match }) => {
    const dispatch = useDispatch();
    const deviceListInRoom = useSelector(state => state.deviceListInRoom);
    const { data: dataList ,loading, error } = deviceListInRoom;
    const [checked, setChecked] = useState("")
    console.log(checked);
    const fields = [
        { key: 'name', _style: { width: '20%' } },
        {
            key: 'description', _style: { width: '10%' }, sorter: false,
            filter: false
        },
        {
            key: 'config', _style: { width: '10%' }, sorter: false,
            filter: false
        },
        {
            key: 'icon', _style: { width: '10%' }, sorter: false,
            filter: false
        },
        { key: 'state', _style: { width: '10%' } },
        { key: 'createdAt', _style: { width: '10%' } },
        {
            key: 'control',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'edit',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'delete',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]
    const getBadge = (status) => {
        switch (status) {
            case 'on': return 'success'
            case 'off': return 'danger'
            default: return 'primary'
        }
    }
    useEffect(() => {
        dispatch(getDevicesInRoom(match.params.id))
    }, [dispatch, match.params.id]);
    return (
        <>
            <CRow>
                <CCol sm={12} >
                    <Modal
                        type="Add device in this room"
                        title="Device info"
                        body={<FormDevice roomId={match.params.id} />}
                        size="lg"
                        color="info"
                    />
                </CCol>
                <CCol sm={12}>
                    <CCard>
                        <CCardHeader>
                            <span className="h4">List devices in this room</span>

                        </CCardHeader>
                        <CCardBody>
                            {loading ? (
                                <Spinner />
                            ) : error ? (
                                <Alert color="danger" msg={error.message} />
                            ) : (
                                        <CDataTable
                                            items={dataList.data}
                                            fields={fields}
                                            columnFilter
                                            tableFilter
                                            footer
                                            itemsPerPageSelect
                                            itemsPerPage={5}
                                            hover
                                            sorter
                                            pagination
                                            scopedSlots={{
                                                'status':
                                                    (item) => (
                                                        <td>
                                                            <CBadge color={getBadge(item.status)}>
                                                                {item.status}
                                                            </CBadge>
                                                        </td>
                                                    ),
                                                'control':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CSwitch className={'mx-1 mr-1'} variant={'3d'} color={'dark'} defaultChecked={item.state === "on" ? true : false} onChange={(e) => setChecked(e.target.checked)} onClick={() => dispatch(controlDevice(item._id, checked ? "on" : "off"))}/>
                                                            </td>
                                                        )
                                                    },
                            
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <Modal
                                                                    type="Update"
                                                                    title="Device update"
                                                                    body={<FormDevice id={item._id} name={item.name} description={item.description} config={item.config} icon={item.icon} state={item.state}/>}
                                                                    size="lg"
                                                                    color="primary"
                                                                />
                                                            </td>
                                                        )
                                                    },
                                                'delete':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <Modal
                                                                    type="Delete"
                                                                    title="Device delete"
                                                                    body={<>
                                                                        <b>{`Do you want delete ${ item.name }?`}</b>
                                                                        <CButton
                                                                            color="danger"
                                                                            onClick={() => { dispatch(deleteDevice(item._id)) }}
                                                                            style={{ float: "right" }}
                                                                        >
                                                                            Delete
                                                                        </CButton>
                                                                    </>}
                                                                    size="sm"
                                                                    color="danger"
                                                                />
                                                            </td>
                                                        )
                                                    },
                                            }}
                                        />)}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Room
