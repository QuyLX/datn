import { CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'
import Sensor from './Sensor'

const CardRoom = ({ title, id }) => {
    return (
        <CCol sm="12" lg="6" >
            <CCard>
                <CCardHeader>
                    <b>{title}</b>
                </CCardHeader>
                <CCardBody>
                    <Sensor roomId={id} />
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default CardRoom
