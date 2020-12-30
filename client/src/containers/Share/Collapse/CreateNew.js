import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CCollapse,
    CRow
} from '@coreui/react';
import LoadComponent from '../LoadComponent/LoadComponent';
const CreateNew = ({type}) => {

    const [accordion, setAccordion] = useState(false)
    return (
        <CRow >
            <CCol xl="12">
                <div id="accordion">
                    <CCard className="mb-0">
                        <CCardHeader id="headingOne">
                            <CButton
                                block
                                color="link"
                                className="text-left m-0 p-0"
                                onClick={() => setAccordion(!accordion)}
                            >
                                <h5 className="m-0 p-0">{accordion ? "Device Form" : "Add New Device"} </h5>
                            </CButton>
                        </CCardHeader>
                        <CCollapse show={accordion === true}>
                            <CCardBody>
                                <LoadComponent type={type}/>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </div>
            </CCol>
        </CRow>
    )
}

export default CreateNew
