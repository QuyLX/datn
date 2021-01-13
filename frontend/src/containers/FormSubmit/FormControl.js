import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CLabel,
    CButton,
    CInputCheckbox
} from '@coreui/react'
import { useDispatch } from 'react-redux';
import { controlDevice } from '../../redux/actions/device';

const FormControl = ({ id, state }) => {
    const distpatch = useDispatch();
    const [form, setForm] = useState({

        state: state || false,

    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        distpatch(controlDevice(id, form))
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol md="3"><CLabel>On/Off</CLabel></CCol>
                <CCol md="9">
                    {state === true ? <CFormGroup variant="checkbox" className="checkbox">
                        <CInputCheckbox onChange={e => onChange(e)} id="state" name="state" defaultChecked />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor="state">On/Off</CLabel>
                    </CFormGroup> : <CFormGroup variant="checkbox" className="checkbox">
                            <CInputCheckbox onChange={e => onChange(e)} id="state" name="state" />
                            <CLabel variant="checkbox" className="form-check-label" htmlFor="state">On/Off</CLabel>
                        </CFormGroup>}
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

export default FormControl
