import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CWidgetProgressIcon,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from '../../../redux/actions/room';
import Spinner from '../../../components/LoadingIndicator/Spinner';
import Alert from '../../../components/Alert/Alerts';

const Rooms = () => {
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
    const history = useHistory()
    const dispatch = useDispatch();
    const roomList = useSelector(state => state.roomList);
    const { loading, error, data } = roomList
    const fields = [
        { key: 'name', _style: { width: '20%' } },
        { key: 'description', _style: { width: '24%' } },
        { key: 'icon', _style: { width: '20%' } },
        { key: 'createdAt', _style: { width: '24%' } },
        {
            key: 'detail',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }

    ]
    useEffect(() => {
        dispatch(getRooms());
    }, [dispatch]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert color="danger" msg={error.message} />
            ) : (
                        <CRow>
                            <CCol sm={12}>

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
                            </CCol>
                            <CCol sm={12}>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={data.data}
                                            fields={fields}
                                            hover
                                            striped
                                            clickableRows
                                            scopedSlots={{
                                                'detail':
                                                    (item, index) => {
                                                        return (
                                                            <td className="py-2">
                                                                <CButton
                                                                    color="success"
                                                                    className="mr-1"
                                                                    onClick={() => history.push(`/rooms/${ item._id }`)}>
                                                                    Detail
                                                                </CButton>
                                                            </td>
                                                        )
                                                    }
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )}
        </>
    )
}

export default React.memo(Rooms)
