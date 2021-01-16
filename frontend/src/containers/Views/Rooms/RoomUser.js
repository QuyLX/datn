import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CDataTable,
    CSwitch
} from '@coreui/react';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import { useDispatch, useSelector } from 'react-redux';
import { getDevicesInRoom, controlDevice, getDevice } from '../../../redux/actions/device';
import ModalUser from '../../../components/Modal/ModalUser';
import ModalHistory from '../../../components/Modal/ModalHistory';
import Modal from '../../../components/Modal/Modal';
import SensorRoom from '../../../components/Mqtt/SensorRoom'
const RoomUser = ({ match }) => {
    const dispatch = useDispatch();
    const deviceListInRoom = useSelector(state => state.deviceListInRoom);
    const userID = useSelector(state => state.auth.user.data._id);
    console.log(userID);
    const { data: dataList, loading, error } = deviceListInRoom;
    const [state, setState] = useState("");

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
        { key: 'createdAt', _style: { width: '10%' } },
        {
            key: 'control',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'history',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        },
        {
            key: 'users',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ]

    useEffect(() => {
        dispatch(getDevicesInRoom(match.params.id))
    }, [dispatch, match.params.id]);
    return (
        <>
            <CRow>
                <CCol sm={12}>
                    <SensorRoom roomId={match.params.id} allDevice={dataList} />
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
                                                'control':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                {item.users && item.users.includes(userID) ?
                                                                (<CSwitch  className={'mx-1 mr-1'} variant={'3d'} color={'success'} defaultChecked={item.state === "on" ? true : false} onChange={(e) => setState(e.target.checked)} onClick={() => {dispatch(controlDevice(item._id, item.state === "off" ? {state : "on"} : {state : "off"})); dispatch(getDevicesInRoom(match.params.id))}} />) : (<CSwitch className={'mx-1 mr-1'} variant={'3d'}
                                                                defaultChecked={item.state === "on" ? true : false} color={'success'} disabled />)
                                                                }
                                                            </td>
                                                        )
                                                    },
                                                'history':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <ModalHistory
                                                                    type="History"
                                                                    title="History"
                                                                    size="lg"
                                                                    color="primary"
                                                                    deviceId={item._id}
                                                                />
                                                            </td>

                                                        )
                                                    },
                 
                                                'users':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <ModalUser
                                                                    type="Users"
                                                                    title="Users"
                                                                    size="sm"
                                                                    color="info"
                                                                    deviceId={item._id}
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

export default RoomUser
