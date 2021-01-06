import React from 'react'
import ChartBarSimple from '../../../components/Charts/ChartBarSimple'
import ChartLineSimple from '../../../components/Charts/ChartLineSimple'
import {
    CCardGroup,
    CCardFooter,
    CCol,
    CLink,
    CRow,
    CWidgetProgress,
    CWidgetIcon,
    CWidgetProgressIcon,
    CWidgetSimple,
    CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Dashboard = () => {
    return (
        <>
            <CRow >
                <CCol>
                    <span className="h1">The weather today</span>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="6" md="3" >
                    <CWidgetProgressIcon
                        header="87.500"
                        text="Drop"
                        color="gradient-info"
                    >
                        <CIcon name="cil-drop" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                        header="385"
                        text="Cloud"
                        color="gradient-success"
                    >
                        <CIcon name="cil-cloudy" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                        header="1238"
                        text="Sun"
                        color="gradient-warning"
                    >
                        <CIcon name="cil-sun" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
                <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                        header="28%"
                        text="Rain"
                        color="gradient-primary"
                    >
                        <CIcon name="cil-rain" height="36" />
                    </CWidgetProgressIcon>
                </CCol>
            </CRow>
            <CCardGroup className="mb-4">
                <CWidgetProgressIcon
                    header="87.500"
                    text="Devices"
                    color="gradient-info"
                    inverse
                >
                    <CIcon name="cil-memory" height="36" />
                </CWidgetProgressIcon>
                <CWidgetProgressIcon
                    header="385"
                    text="Users"
                    color="gradient-success"
                    inverse
                >
                    <CIcon name="cil-people" height="36" />
                </CWidgetProgressIcon>
                <CWidgetProgressIcon
                    header="1238"
                    text="Rooms"
                    color="gradient-warning"
                    inverse
                >
                    <CIcon name="cil-home" height="36" />
                </CWidgetProgressIcon>
            </CCardGroup>
            <CRow>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartLineSimple style={{ height: '40px' }} borderColor="danger" />
                    </CWidgetSimple>
                </CCol>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartLineSimple style={{ height: '40px' }} borderColor="primary" />
                    </CWidgetSimple>
                </CCol>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartLineSimple style={{ height: '40px' }} borderColor="success" />
                    </CWidgetSimple>
                </CCol>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartBarSimple style={{ height: '40px' }} backgroundColor="danger" />
                    </CWidgetSimple>
                </CCol>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartBarSimple style={{ height: '40px' }} backgroundColor="primary" />
                    </CWidgetSimple>
                </CCol>
                <CCol sm="4" lg="2">
                    <CWidgetSimple header="title" text="1,123">
                        <ChartBarSimple style={{ height: '40px' }} backgroundColor="success" />
                    </CWidgetSimple>
                </CCol>
            </CRow>
        </>
    )
}

export default Dashboard
