import React from 'react'
import {
  CAlert,
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'

const Alerts = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardBody>
              <CAlert
                color="info"
                closeButton
              >
                I am an dismissible alert!
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Alerts
