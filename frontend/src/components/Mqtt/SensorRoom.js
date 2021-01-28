import React, { useEffect } from "react";
import { CCol, CCard, CCardBody, CCardHeader, CRow } from "@coreui/react";
import Sensor from "./Sensor";
import { subscribe } from "../../redux/actions/mqtt";
import { useDispatch } from "react-redux";
const SensorRoom = ({ roomName, roomId, allDevice, msg }) => {
  const dispatch = useDispatch();
  const topics = allDevice.map((item) => `${item.room._id}/${item._id}`);
  console.log(msg);
  useEffect(() => {
    dispatch(subscribe(topics));
  }, [dispatch, topics]);
  return (
    <CCol sm="12" md="6">
      <CCard style={{ backgroundColor: "#636f83" }}>
        <CCardHeader
          style={{ backgroundColor: "#636f83", color: "whitesmoke" }}
        >
          <b>{roomName}</b>
        </CCardHeader>
        <CCardBody>
          <CRow>
            {allDevice &&
              allDevice.map((item) => {
                return (
                  item.room._id === roomId && (
                    <Sensor
                      roomName={roomName}
                      name={item.name}
                      key={item._id}
                      status={item.state}
                      icon={item.icon}
                      topics={topics}
                    />
                  )
                );
              })}
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default SensorRoom;
