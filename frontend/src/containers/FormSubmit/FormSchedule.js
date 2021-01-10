import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
    CInputCheckbox,
    CButton
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../redux/actions/schedule'
const FormSchedule = ({ title, description, state, timeStart, timeEnd, id }) => {
    const distpatch = useDispatch();
    const [form, setForm] = useState({
        title: title || "",
        description: description || "",
        state: state || false,
        timeStart: timeStart || "",
        timeEnd: timeEnd || "",

    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    console.log(form);
    const onSubmit = (e) => {
        e.preventDefault();
        distpatch(updateSchedule(id, form))
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="title">Schedule title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput onChange={e => onChange(e)} id="title" name="title" placeholder="Title" defaultValue={title} />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CTextarea
                        onChange={e => onChange(e)}
                        name="description"
                        defaultValue={description}
                        id="description"
                        rows="9"
                        placeholder="Description..."
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3"><CLabel>Set state</CLabel></CCol>
                <CCol md="9">
                    {state == true ? <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox id="state" name="state" defaultChecked />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor="state">State</CLabel>
                    </CFormGroup> : <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox id="state" name="state" />
                            <CLabel variant="checkbox" className="form-check-label" htmlFor="state">State</CLabel>
                        </CFormGroup>}

                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="timeStart">Time Start</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input
                        type="datetime-local"
                        onChange={e => onChange(e)}
                        name="timeStart"
                        id="timeStart"
                        defaultValue={timeStart}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="timeEnd">Time End</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <input
                        type="datetime-local"
                        onChange={e => onChange(e)}
                        name="timeEnd"
                        id="timeEnd"
                        defaultValue={timeEnd}
                    />
                </CCol>
            </CFormGroup>
            <CButton
                type="submit"
                style={{ float: "right" }}
                color="success"
            >
                Submit
            </CButton>
        </CForm>
    )
}

export default FormSchedule
