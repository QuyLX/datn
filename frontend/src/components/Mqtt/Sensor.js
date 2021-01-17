import React from 'react';
import ChartBarSimple from '../Charts/ChartBarSimple';
import ChartLineSimple from '../Charts/ChartLineSimple';
// import mqtt from 'mqtt'

import {
    CCol,
    CRow,
    CWidgetSimple,
} from '@coreui/react';
const Sensor = ({ roomId }) => {
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
