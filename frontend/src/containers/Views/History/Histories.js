import React, { useEffect } from 'react'
import { CDataTable, CBadge } from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux'
import { getHistories } from '../../../redux/actions/history'
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';


const Histories = () => {
    const dispatch = useDispatch();
    const historyList = useSelector(state => state.historyList);
    const { loading, error, data } = historyList
    console.log(data);
    useEffect(() => {
        dispatch(getHistories())
    }, [dispatch]);
    const fields = [
        { key: 'user', _style: { width: '20%' } },
        { key: 'state', _style: { width: '20%' } },
        { key: 'device', _style: { width: '20%' } },
        { key: 'createdAt', _style: { width: '20%' } },
    ]

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CDataTable
                            items={data && data.data}
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
                                'state':
                                    (item) => (
                                        <td>
                                            {item.state === true ? <CBadge color="success">
                                                Bật
                                            </CBadge> : <CBadge color="danger">Tắt</CBadge>}

                                        </td>
                                    ),
                                'device':
                                    (item) => (
                                       <td>{item.device.deviceName}</td>
                                    )
                            }}
                        />)}
        </>
    )
}

export default React.memo(Histories)



