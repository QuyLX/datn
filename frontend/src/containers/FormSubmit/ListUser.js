import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CSelect,
    CLabel,
    CButton
} from '@coreui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToUseDevice } from '../../redux/actions/user';

const ListUser = ({ deviceId }) => {
    const distpatch = useDispatch();
    const username = useSelector(state => state.userList);
    const { data } = username
    const [form, setForm] = useState({
        id: "",
    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        distpatch(addUserToUseDevice(deviceId, form.id))
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="name">Name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CSelect
                        custom
                        name="id"
                        id="name"
                        onChange={e => onChange(e)}
                    >
                        {data && data.data.map(item => (
                            <option value={item._id} key={item._id}>{item.name}</option>
                        ))}
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

export default ListUser
