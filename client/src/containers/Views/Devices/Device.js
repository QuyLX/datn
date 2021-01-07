import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import {  useSelector } from 'react-redux';
const Device = ({ match }) => {
  const { data } = useSelector(state => state.deviceList.data);

  const device = data.find(device => device._id.toString() === match.params.id)
  const deviceDetails = device ? Object.entries(device) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CCard>
            <CCardHeader>
              device id: {match.params.id}
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    
                  }
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Device
