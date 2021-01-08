import React from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
} from '@coreui/react'
const FormSchedule = ({ title, description, status, dateAndTime, startHour, duration }) => {
    return (
        <CForm className="form-horizontal">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="title">Schedule title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="title" name="title" placeholder="Title" defaultValue={title} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CTextarea
                        name="descriptiont"
                        defaultValue={description}
                        id="description"
                        rows="9"
                        placeholder="Description..."
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="status">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="status" name="status" placeholder="Status" defaultValue={status} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="date-input">Date</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" defaultValue={dateAndTime} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="hour">Start hour</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="hour" type="number" name="hour" placeholder="Start hour" defaultValue={startHour} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="duration">Duration</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="duration" type="number" name="duration" placeholder="Duration" defaultValue={duration} />
                </CCol>
            </CFormGroup>
        </CForm>
    )
}

export default FormSchedule
