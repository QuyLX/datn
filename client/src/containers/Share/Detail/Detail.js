import React from 'react'
import {
    CRow, CCol
} from '@coreui/react'
import BasedForm from '../Form/BasedForm'
import Tabs from '../Tabs/Tabs'

const Detail = (props) => {
    console.log(props.match.path.indexOf("dashboard"));
    return (
        <>
            <CRow>
                <CCol >
                    {/* <BasedForm /> */}
                    This is detail
                </CCol>
            </CRow>
            {/* <CRow>
                <CCol >
                    <Tabs />
                </CCol>
            </CRow> */}
        </>
    )
}

export default Detail
