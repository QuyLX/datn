import React from 'react'
import { CCol, CDataTable } from '@coreui/react';


const Device = ({ data }) => {
    const fieldUser = [
        { key: 'name', _style: { width: '20%' } }
    ]
    return (
        <>
            <CCol  >
                <span className="h4">List user in used device</span>
            </CCol>
            <CCol >
                <CDataTable
                    items={data && data.data && data.data.users}
                    fields={fieldUser}
                    hover
                    sorter
                />
            </CCol>
        </>
    )
}

export default Device
