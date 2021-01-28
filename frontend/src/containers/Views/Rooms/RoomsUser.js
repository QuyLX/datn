import React, { useEffect, useState } from "react";
import { CCol, CRow, CWidgetProgressIcon } from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../../redux/actions/room";
import Spinner from "../../../components/Spinner/Spinner";
import Alert from "../../../components/Alert/Alert";
import CardRoomUser from "../../../components/Mqtt/CardRoomUser";

const Rooms = () => {
  const [weather, setWeather] = useState({});
  const [isLoaded, setIsLoaed] = useState(false);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Hanoi&units=metric&cnt=1&appid=b601c6df42ba9f76613140d480b14bc6`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setIsLoaed(true);
      });

    setIsLoaed(false);
  }, []);
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomList);
  const deviceList = useSelector((state) => state.deviceList);

  const { loading: loadRoom, error: errRoom, data: dataRoom } = roomList;
  const {
    loading: loadDevice,
    error: errDevice,
    data: dataDevice,
  } = deviceList;
  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <>
      {loadRoom || loadDevice ? (
        <Spinner />
      ) : errRoom || errDevice ? (
        <>
          <Alert color="danger" msg={errDevice.message} />
          <Alert color="danger" msg={errRoom.message} />
        </>
      ) : (
        <CRow>
          <CCol sm={12}>
            <CRow>
              <CCol>
                <CIcon name="cil-cloudy" height="36" />
                {"   "}
                <span className="h3">Thời tiết hôm nay</span>
              </CCol>
              <CCol></CCol>
            </CRow>
            <CRow>
              {!isLoaded ? (
                <Spinner />
              ) : (
                <>
                  <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                      header={`${weather.main.humidity} %`}
                      text="Độ ẩm"
                      color="gradient-info"
                    ></CWidgetProgressIcon>
                  </CCol>
                  <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                      header={`${weather.wind.speed} m/s`}
                      text="Gió"
                      color="gradient-success"
                    ></CWidgetProgressIcon>
                  </CCol>
                  <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                      header={`${weather.main.feels_like} °c`}
                      text="Nhiệt độ cảm nhận"
                      color="gradient-warning"
                    ></CWidgetProgressIcon>
                  </CCol>
                  <CCol sm="6" md="3">
                    <CWidgetProgressIcon
                      header={`${weather.main.temp} °c`}
                      text="Nhiệt độ"
                      color="gradient-primary"
                    ></CWidgetProgressIcon>
                  </CCol>
                </>
              )}
            </CRow>
          </CCol>
          {dataRoom &&
            dataRoom.data.map((item) => (
              <CardRoomUser
                roomId={item._id}
                key={item._id}
                roomName={item.name}
                desc={item.description}
                icon={item.icon}
                allDevice={dataDevice.data}
              />
            ))}
        </CRow>
      )}
    </>
  );
};

export default React.memo(Rooms);
