import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CButton
} from '@coreui/react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/auth'
const ResetPassword = ({ id }) => {
    const distpatch = useDispatch();
    const [form, setForm] = useState({
        password: "",
    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        distpatch(resetPassword(id, form))
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol >
                    <CInput
                        type="text"
                        name="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={e => onChange(e)}
                    />
                </CCol>
            </CFormGroup>
            <CButton
                type="submit"
                style={{ float: "right" }}
                color="primary"
            >
                Submit
            </CButton>
        </CForm>
    )
}

export default ResetPassword
