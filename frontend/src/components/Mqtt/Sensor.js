import React, { useState, useEffect } from 'react';
import ChartBarSimple from '../Charts/ChartBarSimple';
import ChartLineSimple from '../Charts/ChartLineSimple';
import mqtt from 'mqtt'

import {
    CCol,
    CRow,
    CWidgetSimple,
} from '@coreui/react';
const Sensor = ({ roomId }) => {
    const [sensorData, setSensorData] = useState({});
    useEffect(async () => {
        // const client = await mqtt.connect();
        // client.on("connect", () => {
        //     console.log("connected");
        //     client.subscribe("telemetry");
        // });
        // client.on('message', (topic, message) => {
        //     handleJsonMessage(JSON.parse(message.toString()));
        // })
    })
    const handleJsonMessage = (json) => {
        const temperatures = sensorData.temperatures || []
        const humidities = sensorData.humidities || []
        const lights = sensorData.lights || []
        const pressures = sensorData.pressures || []
        const time = Date.now();
        temperatures.push([time, json.temperature || 0])
        humidities.push([time, json.humidity || 0])
        lights.push([time, json.lux || 0])
        pressures.push([time, json.pressure || 0])
        setSensorData({
            data: { ...json },
            temperatures,
            humidities,
            pressures,
            lights
        })
    }
    return (
        <CRow>
            <CCol sm="12" md="6" >
                <CWidgetSimple header="title" text="1,123">
                    <ChartLineSimple style={{ height: '40px' }} borderColor="danger" />
                </CWidgetSimple>
            </CCol>
            <CCol sm="12" md="6" >
                <CWidgetSimple header="title" text="1,123">
                    <ChartBarSimple style={{ height: '40px' }} backgroundColor="danger" />
                </CWidgetSimple>
            </CCol>
        </CRow>
    )
}

export default Sensor;
