import React from 'react'
import { CCard, CCardHeader, CCol, CRow } from '@coreui/react';
const Schedule = ({ match }) => {
    return (
        <>
            <CRow>
                <CCol sm={12}>
                    <CCard>
                        <CCardHeader>
                            Schedule id: {match.params.id}
                        </CCardHeader>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Schedule
