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

    useEffect(() => {
        dispatch(getHistories())
    }, [dispatch]);
    const fields = [
        { key: 'name', _style: { width: '40%' } },
        'registered',
        { key: 'role', _style: { width: '20%' } },
        { key: 'status', _style: { width: '20%' } }
    ]

    const getBadge = (status) => {
        switch (status) {
            case 'Active': return 'success'
            case 'Inactive': return 'secondary'
            case 'Pending': return 'warning'
            case 'Banned': return 'danger'
            default: return 'primary'
        }
    }
    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
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
                                'status':
                                    (item) => (
                                        <td>
                                            <CBadge color={getBadge(item.status)}>
                                                {item.status}
                                            </CBadge>
                                        </td>
                                    )
                            }}
                        />)}
        </>
    )
}

export default React.memo(Histories) 



