import React, {memo} from "react";
import {
  CCol,
  CWidgetSimple,
  CSwitch,
  CRow,
  CWidgetProgressIcon,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";


const Sensor = ({ name, status, icon }) => {

  return (
    <CCol sm="12" md="6">
      <CWidgetSimple
        header={name}
        text={name === "sensor1" ? "DHT11 realtime" : status}
      >
        <CRow>
          <CCol sm="6">
            {name === "sensor1" ? (
              <CWidgetProgressIcon
                header={`alo`}
                text="Humd"
                color="gradient-info"
              ></CWidgetProgressIcon>
            ) : (
              <CIcon
                style={{
                  color: status === "on" ? "orange" : "gray",
                }}
                size="4xl"
                name={icon}
              />
            )}
          </CCol>
          {name === "sensor1" ? (
            <CCol sm="6">
              <CWidgetProgressIcon
                header={`alo2`}
                text="Temp"
                color="gradient-success"
              ></CWidgetProgressIcon>
            </CCol>
          ) : (
            <CCol
              style={{
                paddingTop: "6%",
              }}
              sm="6"
            >
              <CSwitch
                className={"mx-1"}
                variant={"3d"}
                color={"success"}
                defaultChecked={status === "on" ? true : false}
                onChange={(e) => {
                  console.log(e.target.checked);
                }}
              />
            </CCol>
          )}
        </CRow>
      </CWidgetSimple>
    </CCol>
  );
};

export default memo(Sensor);
