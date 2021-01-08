import React from 'react'
import { CFooter } from '@coreui/react'

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a  rel="noopener noreferrer">Smart home</a>
        <span className="ml-1">&copy; 2020</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by QuyLx</span>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)