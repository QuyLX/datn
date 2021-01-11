import React from 'react'
import { CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import Sensor from './Sensor'

const SensorRoom = ({ roomId, allDevice }) => {
    // console.log(allDevice);
    return (
        <div>
            <CCol sm="12"  >
                <CCard>
                    <CCardHeader>
                        <b>RoomId: {roomId}</b>
                    </CCardHeader>
                    <CCardBody>
                        <Sensor roomId={roomId} />
                    </CCardBody>
                </CCard>
            </CCol>
        </div>
    )
}

export default SensorRoom
