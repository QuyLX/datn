import React from 'react'
import { CCard, CButton, CForm, CInput, CRow, CCol } from '@coreui/react';

const Connection = ({ connect, disconnect, connectBtn }) => {
    const [form] = Form.useForm();
    const record = {
        host: 'broker.emqx.io',
        clientId: `mqttjs_ + ${ Math.random().toString(16).substr(2, 8) }`,
        port: 8083,
    };
    const onFinish = (values) => {
        const { host, clientId, port, username, password } = values;
        const url = `ws://${ host }:${ port }/mqtt`;
        const options = {
            keepalive: 30,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            },
            rejectUnauthorized: false
        };
        options.clientId = clientId;
        options.username = username;
        options.password = password;
        connect(url, options);
    };

    const handleConnect = () => {
        form.submit();
    };

    const handleDisconnect = () => {
        disconnect();
    };

    const ConnectionForm = (
        <CForm
            layout="vertical"
            name="basic"
            form={form}
            initialValues={record}
            onFinish={onFinish}
        >
            <CRow gutter={20}>
                <CCol span={8}>
                    <CLabel htmlFor="host">Host</CLabel>
                    <CInput id="host" name="host" placeholder="Host" />
                    <CFormText>This is a help text</CFormText>
                </CCol>
                <CCol span={8}>
                    <CLabel htmlFor="port">Port</CLabel>
                    <CInput id="port" name="port" placeholder="Port" />
                    <CFormText>This is a help text</CFormText>
                </CCol>
                <CCol span={8}>
                    <CLabel htmlFor="clientId">Client ID</CLabel>
                    <CInput id="clientId" name="clientId" placeholder="Client ID" />
                    <CFormText>This is a help text</CFormText>
                </CCol>
                <CCol span={8}>
                    <CLabel htmlFor="port">Username</CLabel>
                    <CInput id="username" name="username" placeholder="Username" />
                    <CFormText>This is a help text</CFormText>
                </CCol>
                <CCol span={8}>
                    <CLabel htmlFor="password">Password</CLabel>
                    <CInput id="password" name="password" placeholder="Password" />
                    <CFormText>This is a help text</CFormText>
                </CCol>
            </CRow>
        </CForm>
    )

    return (
        <CCard
            title="Connection"
            actions={[
                <CButton type="primary" onClick={handleConnect}>{connectBtn}</CButton>,
                <CButton danger onClick={handleDisconnect}>Disconnect</CButton>
            ]}
        >
            {ConnectionForm}
        </CCard>
    );
}

export default Connection
