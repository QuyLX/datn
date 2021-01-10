import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CBadge
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getSchedules } from '../../../redux/actions/schedule';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';
import Modal from '../../../components/Modal/Modal';
import FormSchedule from '../../FormSubmit/FormSchedule'


const Schedules = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const scheduleList = useSelector(state => state.scheduleList);
    const { loading, error, data } = scheduleList

    const fields = [
        { key: 'title', _style: { width: '20%' } },
        { key: 'description', _style: { width: '10%' } },
        { key: 'state', _style: { width: '10%' } },
        { key: 'timeStart', _style: { width: '10%' } },
        { key: 'timeEnd', _style: { width: '10%' } },
        { key: 'createdAt', _style: { width: '10%' } },
        { key: 'user', _style: { width: '10%' } },
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
        dispatch(getSchedules());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CRow>
                            <CCol sm={12}>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={data.data}
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
                                                'detail':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton
                                                                    color="success"
                                                                    className="mr-1"
                                                                    onClick={() => history.push(`/schedules/${ item._id }`)}>
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
                                                                    title="Schedule update"
                                                                    body={<FormSchedule
                                                                        title={item.title}
                                                                        description={item.description}
                                                                        state={item.state}
                                                                        timeStart={item.timeStart}
                                                                        timeEnd={item.timeEnd}
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
                                                                    title="Schedule delete"
                                                                    body={<b>{`Do you want to cancel schedule ${ item.name }?`}</b>}
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

export default React.memo(Schedules) 
