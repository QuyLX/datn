import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSwitch
} from '@coreui/react'

const Switches = () => {
  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked onChange={(e)=>console.log(e.target.checked)}/>
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked />
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'}  />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md="12">
        <h4>Disabled</h4>
      </CCol>

      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            3d Switch
          </CCardHeader>
          <CCardBody>
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'secondary'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'warning'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'info'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'danger'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'light'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'dark'} defaultChecked disabled />
            <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} disabled />
          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}

export default Switches
