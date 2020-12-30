import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CTextarea,
    CInputCheckbox,
    CSelect,
    CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const BasedForm = ({ basedInput }) => {
    return (
        <>
            <CCard>
                <CCardHeader>
                    <b>Basic Form</b>
                </CCardHeader>
                <CCardBody>
                    <CForm encType="multipart/form-data" className="form-horizontal">
                        {basedInput.map(item => {
                            switch (item.type) {
                                case "input":
                                    return (
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor={item.id}>{item.labelName}</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CInput type={item.type} id={item.id} name={item.id} />
                                            </CCol>
                                        </CFormGroup>
                                    )
                                case "textarea":
                                    return (
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor={item.id}>{item.labelName}</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CTextarea
                                                    name={item.id}
                                                    id={item.id}
                                                    rows="9"
                                                />
                                            </CCol>
                                        </CFormGroup>
                                    )
                                case "checkbox":
                                    return (
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel>{item.labelName}</CLabel>
                                            </CCol>
                                            <CCol md="9">
                                                {item.children.map(option => (
                                                    <CFormGroup variant="custom-checkbox" inline>
                                                        <CInputCheckbox
                                                            custom
                                                            id={option.id}
                                                            name={option.id}
                                                            value={option.value}
                                                        />
                                                        <CLabel variant="custom-checkbox" htmlFor={option.id}>{option.name}</CLabel>
                                                    </CFormGroup>
                                                ))}
                                            </CCol>
                                        </CFormGroup>
                                    )
                                case "select":
                                    return (
                                        <CFormGroup row>
                                            <CCol md="3">
                                                <CLabel htmlFor={item.id}>{item.labelName}</CLabel>
                                            </CCol>
                                            <CCol xs="12" md="9">
                                                <CSelect custom name={item.id} id={item.id}>
                                                    {item.children.map(option => (
                                                        <option value={option.value}>{option.name}</option>
                                                    ))}
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                    )
                                case "file":
                                    return (
                                        <CFormGroup row>
                                            <CLabel col md="3" htmlFor={item.id}>{item.labelName}</CLabel>
                                            <CCol xs="12" md="9">
                                                <CInputFile id={item.id} name={item.id} />
                                            </CCol>
                                        </CFormGroup>
                                    )
                                default:
                                    return "";
                            }
                        })}
                    </CForm>
                </CCardBody>
                <CCardFooter>
                    <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                </CCardFooter>
            </CCard>
        </>
    )
}

export default BasedForm
