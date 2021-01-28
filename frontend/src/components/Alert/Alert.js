import React from 'react'
import {
  CAlert,
  CCol,
  CRow
} from '@coreui/react'

const Alerts = ({ color, msg }) => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CAlert
            color={color}
            closeButton
          >
            {msg}
          </CAlert>
        </CCol>
      </CRow>
    </>
  )
}

export default Alerts
