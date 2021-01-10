import React, { useEffect, useState } from 'react'
import {
    CCardGroup,
    CCol,
    CRow,
    CWidgetProgressIcon,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux';
import Alert from '../../../components/Alert/Alerts';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import CardRoom from '../../../components/Mqtt/CardRoom';
const Dashboard = () => {
    const [weather, setWeather] = useState({});
    const [isLoaded, setIsLoaed] = useState(false)
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&cnt=1&appid=b601c6df42ba9f76613140d480b14bc6`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setIsLoaed(true)
            });

        setIsLoaed(false)
    }, []);
    const roomList = useSelector(state => state.roomList);
    const userList = useSelector(state => state.userList);
    const deviceList = useSelector(state => state.deviceList);
    const { loading: loadRoom, error: errRoom, data: dataRoom } = roomList;
    const { loading: loadUser, error: errUser, data: dataUser } = userList;
    const { loading: loadDevice, error: errDevice, data: dataDevice } = deviceList;
    return (
        <>
            <CRow >
                <CCol>
                    <CIcon name="cil-cloudy" height="36" />
                    {"   "}
                    <span className="h3">Thời tiết hôm nay</span>
                </CCol>
                <CCol>
                </CCol>
            </CRow>
            <CRow>
                {!isLoaded ? <Spinner /> : <>
                    <CCol sm="6" md="3" >
                        <CWidgetProgressIcon
                            header={`${ weather.main.humidity } %`}
                            text="Độ ẩm"
                            color="gradient-info"
                        >
                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol sm="6" md="3">
                        <CWidgetProgressIcon
                            header={`${ weather.wind.speed } m/s`}
                            text="Gió"
                            color="gradient-success"
                        >

                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol sm="6" md="3">
                        <CWidgetProgressIcon
                            header={`${ weather.main.feels_like } °c`}
                            text="Nhiệt độ cảm nhận"
                            color="gradient-warning"
                        >
                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol sm="6" md="3">
                        <CWidgetProgressIcon
                            header={`${ weather.main.temp } °c`}
                            text="Nhiệt độ"
                            color="gradient-primary"
                        >
                        </CWidgetProgressIcon>
                    </CCol>
                </>}
            </CRow>
            <CCardGroup className="mb-4">
                {loadDevice ? " " : errDevice ? (
                    <Alert color="danger" msg={errDevice.message} />
                ) : (
                        <CWidgetProgressIcon
                            header={`${ dataDevice.count }`}
                            text="Số thiết bị"
                            color="gradient-info"
                            inverse
                        >
                            <CIcon name="cil-memory" height="36" />
                        </CWidgetProgressIcon>
                    )}
                {loadUser ?
                    ""
                    : errUser ? (
                        <Alert color="danger" msg={errUser.message} />
                    ) : (
                            <CWidgetProgressIcon
                                header={`${ dataUser.count }`}
                                text="Số người trong hệ thống"
                                color="gradient-success"
                                inverse
                            >
                                <CIcon name="cil-people" height="36" />
                            </CWidgetProgressIcon>)}
                {loadRoom ? <Spinner /> : errRoom ? (
                    <Alert color="danger" msg={errRoom.message} />
                ) : (
                        <CWidgetProgressIcon
                            header={`${ dataRoom.count }`}
                            text="Số phòng"
                            color="gradient-warning"
                            inverse
                        >
                            <CIcon name="cil-home" height="36" />
                        </CWidgetProgressIcon>)}
            </CCardGroup>
            {loadRoom || loadRoom === undefined ? <Spinner /> : errRoom ? (
                <Alert color="danger" msg={errRoom.message} />
            ) : (
                    <CRow>
                        {dataRoom.data.map(room => (
                            <CardRoom title={room.name} key={room._id} id={room._id}/>
                        ))}
                    </CRow>)}
        </>
    )
}

export default React.memo(Dashboard)
