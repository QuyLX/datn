import React, { useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal'
import CIcon from '@coreui/icons-react';
import FormDevice from '../../FormSubmit/FormDevice'
import { useDispatch, useSelector } from 'react-redux';
import { getDevicesInRoom } from '../../../redux/actions/device'
const Room = ({ match }) => {
    const { data } = useSelector(state => state.roomList.data);
    const dispatch = useDispatch();
    const deviceListInRoom = useSelector(state => state.deviceListInRoom);
    const { loading, error } = deviceListInRoom;
    const room = data.find(room => room._id.toString() === match.params.id)
    const roomDetails = room ? Object.entries(room) :
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
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
                            Room id: {match.params.id}
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped table-hover">
                                <tbody>
                                    {
                                        roomDetails.map(([key, value], index) => {
                                            return (
                                                <tr key={index.toString()}>
                                                    <td>{`${ key }:`}</td>
                                                    <td><strong>{value}</strong></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CRow >
                            <CCol>
                                <span className="h4">List devices in this room</span>
                            </CCol>
                            <CCol sm={12}>
                                <CCard>
                                    <CCardBody>
                                        <table className="table table-striped table-hover">
                                            <tbody>
                                                {
                                                    // deviceListInRoom.data.map(([key, value], index) => {
                                                    //     return (
                                                    //         <tr key={index.toString()}>
                                                    //             <td>{`${ key }:`}</td>
                                                    //             <td><strong>{value}</strong></td>
                                                    //         </tr>
                                                    //     )
                                                    // }) 
                                                }
                                            </tbody>
                                        </table>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )}
        </>
    )
}

export default Room
