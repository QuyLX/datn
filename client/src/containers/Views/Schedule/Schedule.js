import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import schedulesData from './ScheduleData'

const Schedule = ({ match }) => {
    const schedule = schedulesData.find(schedule => schedule.id.toString() === match.params.id)
    const scheduleDetails = schedule ? Object.entries(schedule) :
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
        <CRow>
            <CCol lg={6}>
                <CCard>
                    <CCardHeader>
                        Schedule id: {match.params.id}
                    </CCardHeader>
                    <CCardBody>
                        <table className="table table-striped table-hover">
                            <tbody>
                                {
                                    scheduleDetails.map(([key, value], index) => {
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
    )
}

export default Schedule
