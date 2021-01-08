import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

import CIcon from '@coreui/icons-react';

import {  useSelector } from 'react-redux';
const Schedule = ({ match }) => {
    const { data } = useSelector(state => state.scheduleList.data);
    
    const schedule = data.find(schedule => schedule._id.toString() === match.params.id)
    // const scheduleDetails = schedule ? Object.entries(schedule) :
        [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

    return (
        <>
            <CRow>
                <CCol sm={12}>
                    <CCard>
                        <CCardHeader>
                            Schedule id: {match.params.id}
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped table-hover">
                                
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Schedule
