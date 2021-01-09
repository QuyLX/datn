import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getRooms, deleteRoom } from '../../../redux/actions/room';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal';
import FormRoom from '../../FormSubmit/FormRoom';

const Rooms = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const roomList = useSelector(state => state.roomList);
    const { loading, error, data } = roomList
    const fields = [
        { key: 'name', _style: { width: '20%' } },
        { key: 'description', _style: { width: '24%' } },
        { key: 'icon', _style: { width: '20%' } },
        { key: 'createdAt', _style: { width: '24%' } },
        {
            key: 'detail',
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
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CRow>
                            <CCol sm={12} >
                                <Modal
                                    type="Create new room"
                                    title="Room info"
                                    body={<FormRoom />}
                                    size="lg"
                                    color="info"
                                />
                            </CCol>
                            <CCol sm={12}>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={data.data}
                                            fields={fields}
                                            hover
                                            striped
                                            clickableRows
                                            scopedSlots={{
                                                'detail':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton
                                                                    color="success"
                                                                    className="mr-1"
                                                                    onClick={() => history.push(`/rooms/${ item._id }`)}>
                                                                    Detail
                                                        </CButton>
                                                            </td>
                                                        )
                                                    },
                                                'edit':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <Modal
                                                                    type="Update"
                                                                    title="Room update"
                                                                    body={<FormRoom
                                                                        name={item.name}
                                                                        description={item.description}
                                                                        icon={item.icon}
                                                                        id={item._id}
                                                                    />}
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
                                                                    title="Room delete"
                                                                    body={
                                                                        <>
                                                                            <b>{`Do you want delete ${ item.name }?`}</b>
                                                                            <CButton
                                                                                color="danger"
                                                                                onClick={() => { dispatch(deleteRoom(item._id)) }}
                                                                                style={{float: "right"}}
                                                                            >
                                                                                Delete
                                                                            </CButton>
                                                                        </>
                                                                    }
                                                                    size="sm"
                                                                    color="danger"
                                                                />
                                                            </td>
                                                        )
                                                    },
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )}
        </>
    )
}

export default React.memo(Rooms)
