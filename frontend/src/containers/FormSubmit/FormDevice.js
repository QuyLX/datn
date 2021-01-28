import React, { useState } from 'react'
import {
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
    CButton,
} from '@coreui/react'
import { useDispatch } from 'react-redux';
import Editor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { addDevice, updateDevice, getDevices } from '../../redux/actions/device'
const FormDevice = ({ name, description, icon, state ,config, id, roomId }) => {
    const [code, setCode] = useState(`{
        // Config device in here
}`);
    const distpatch = useDispatch();
    const [form, setForm] = useState({
        name: name || "",
        description: description || "",
        icon: icon || "",
        config: config || ""
    })
    form.config = code;
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
        checkTypeOfAction(name, form);
        distpatch(getDevices())    
    }
    return (
        <CForm onSubmit={(e) => { onSubmit(e)}} className="form-horizontal">
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
                    <Editor
                        value={code}
                        onValueChange={code => setCode(code)}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        }}
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

export default FormDevice
