import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
    CButton
} from '@coreui/react'
import { useDispatch } from 'react-redux';
import { addDevice, updateDevice } from '../../redux/actions/device'
const FormDevice = ({ name, description, icon, config, id, roomId }) => {
    const distpatch = useDispatch();
    const [form, setForm] = useState({
        name: name || "",
        description: description || "",
        icon: icon || "",
        config: config || ""
    })
    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const checkTypeOfAction = (name, form) => {
        if (name) {
            return distpatch(updateDevice(id, form))
        } else return distpatch(addDevice(roomId, form))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        checkTypeOfAction(name, form)
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e) }} className="form-horizontal">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="name">Device name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput
                        id="name"
                        name="name"
                        placeholder="Device name"
                        defaultValue={name}
                        onChange={e => onChange(e)}

                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="description">Description</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CTextarea
                        name="description"
                        defaultValue={description}
                        id="description"
                        rows="9"
                        placeholder="Description..."
                        onChange={e => onChange(e)}

                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="icon">Icon name</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput
                        id="icon"
                        name="icon"
                        placeholder="Icon name"
                        defaultValue={icon}
                        onChange={e => onChange(e)}

                    />
                </CCol>
            </CFormGroup>
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="config">Config</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CTextarea
                        name="config"
                        defaultValue={config}
                        id="config"
                        rows="9"
                        placeholder="config..."
                        onChange={e => onChange(e)}
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

export default FormDevice
