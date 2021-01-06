import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination
} from '@coreui/react'

import schedulesData from './ScheduleData'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}

const Schedules = () => {
    const history = useHistory()
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage)

    const pageChange = newPage => {
        currentPage !== newPage && history.push(`/schedules?page=${ newPage }`)
    }

    useEffect(() => {
        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return (
        <CRow>
            <CCol xl={6}>
                <CCard>
                    <CCardHeader>
                        Schedules
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={schedulesData}
                            fields={[
                                { key: 'name', _classes: 'font-weight-bold' },
                                'registered', 'role', 'status'
                            ]}
                            hover
                            striped
                            itemsPerPage={5}
                            activePage={page}
                            clickableRows
                            onRowClick={(item) => history.push(`/schedules/${ item.id }`)}
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
                        />
                        <CPagination
                            activePage={page}
                            onActivePageChange={pageChange}
                            pages={5}
                            doubleArrows={false}
                            align="center"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Schedules
