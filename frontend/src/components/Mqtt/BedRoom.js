import React from "react";
import { CCol, CCard, CCardBody, CCardHeader, CRow } from "@coreui/react";
// import Sensor from "./Sensor";
// import { subscribe } from "../../redux/actions/mqtt";
// import { useDispatch } from "react-redux";
const BedRoom = () => {
  //   const dispatch = useDispatch();
  //   const topics = allDevice.map((item) => `${item.room._id}/${item._id}`);
  //   console.log(msg);
  //   useEffect(() => {
  //     dispatch(subscribe(topics));
  //   }, [dispatch, topics]);
  return (
    <CCol sm="12" md="6">
      <CCard style={{ backgroundColor: "#636f83" }}>
        <CCardHeader
          style={{ backgroundColor: "#636f83", color: "whitesmoke" }}
        >
          <b>Bed Room</b>
        </CCardHeader>
        <CCardBody>
          <CRow></CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

export default BedRoom;
