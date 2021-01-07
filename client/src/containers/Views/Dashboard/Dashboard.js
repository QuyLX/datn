import React from 'react'
import ChartBarSimple from '../../../components/Charts/ChartBarSimple'
import ChartLineSimple from '../../../components/Charts/ChartLineSimple'
import {
    CCardGroup,
    CCol,
    CRow,
    CWidgetProgressIcon,
    CWidgetSimple,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux';
import Alert from '../../../components/Alert/Alerts';
const Dashboard = () => {
    const roomList = useSelector(state => state.roomList);
    const userList = useSelector(state => state.userList);
    const deviceList = useSelector(state => state.deviceList);
    const { loading: loadRoom, error: errRoom, data: dataRoom } = roomList
    const { loading: loadUser, error: errUser, data: dataUser } = userList
    const { loading: loadDevice, error: errDevice, data: dataDevice } = deviceList
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
                {loadDevice ? "..." : errDevice ? (
                    <Alert color="danger" msg={errDevice.message} />
                ) : (
                            <CWidgetProgressIcon
                                header={dataDevice.count}
                                text="Devices"
                                color="gradient-info"
                                inverse
                            >
                                <CIcon name="cil-memory" height="36" />
                            </CWidgetProgressIcon>
                        )}
                {loadUser ? 
                    "..."
                 : errUser ? (
                    <Alert color="danger" msg={errUser.message} />
                ) : (
                            <CWidgetProgressIcon
                                header={dataUser.count}
                                text="Users in system"
                                color="gradient-success"
                                inverse
                            >
                                <CIcon name="cil-people" height="36" />
                            </CWidgetProgressIcon>)}
                {loadRoom ? "..." : errRoom ? (
                    <Alert color="danger" msg={errRoom.message} />
                ) : (
                            <CWidgetProgressIcon
                                header={dataRoom.count}
                                text="Rooms"
                                color="gradient-warning"
                                inverse
                            >
                                <CIcon name="cil-home" height="36" />
                            </CWidgetProgressIcon>)}
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

export default React.memo(Dashboard)
