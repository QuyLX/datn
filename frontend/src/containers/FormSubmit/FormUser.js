import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CSelect,
    CInput,
    CLabel,
    CButton
} from '@coreui/react';
import { useDispatch } from 'react-redux';
import { createUser, updateUser } from '../../redux/actions/user'
const FormUser = ({ name, email, role, id }) => {
    const distpatch = useDispatch();
    const [form, setForm] = useState({
        name: name || "",
        email: email || "",
        role: role || "",
        password: "",
    })
    const [formUpdate, setFormUpdate] = useState({
        name: name || "",
        email: email || "",
        role: role || ""
    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value })
    }
    const checkTypeOfAction = (name, form) => {
        if (name) {
            return distpatch(updateUser(id, formUpdate))
        } else return distpatch(createUser(form))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        checkTypeOfAction(name, form)
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="name">User name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput
                        id="name"
                        name="name"
                        placeholder="User name"
                        defaultValue={name}
                        onChange={e => onChange(e)}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="email">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput
                        name="email"
                        defaultValue={email}
                        id="email"
                        type="email"
                        rows="9"
                        placeholder="email..."
                        onChange={e => onChange(e)}
                    />
                </CCol>
            </CFormGroup>
            {!name ? <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="password">Password</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput
                        type="text"
                        id="password"
                        name="password"
                        defaultValue={form.password}
                        placeholder="Password"
                        onChange={e => onChange(e)}
                    />
                </CCol>
            </CFormGroup> : ""}

            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="role">Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CSelect
                        custom
                        name="role"
                        id="role"
                        onChange={e => onChange(e)}
                    >
                        <option defaultValue={role}>{role}</option>
                        <option value="user">user</option>
                        <option value="moderator">morderator</option>
                        <option value="admin">admin</option>
                    </CSelect>
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

export default FormUser
