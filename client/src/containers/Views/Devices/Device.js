import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import devicesData from './DevicesData'

const Device = ({match}) => {
  const device = devicesData.find(device => device.id.toString() === match.params.id)
  const deviceDetails = device ? Object.entries(device) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  return (
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Device id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                  deviceDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
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

export default Device
