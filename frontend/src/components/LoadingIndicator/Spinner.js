import React from 'react'
import { CSpinner } from '@coreui/react'

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center height-wrapper" >
            <CSpinner
                color="primary"
                style={{ width: '2rem', height: '2rem' }}
            />
        </div>
    )
}

export default Spinner
