import React from 'react'
import {
  CButton,
} from '@coreui/react'

const Buttons = () => {
  return (
    <>
      <CButton block color="primary">Primary</CButton>
      <CButton active block color="primary" aria-pressed="true">Primary</CButton>
      <CButton block color="primary" disabled>Primary</CButton>
    </>
  )
}

export default Buttons
