import React, { useEffect } from "react";
import { TheSidebar, TheFooter, TheHeader, TheContent } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { connect, disconnect } from "../../redux/actions/mqtt";
const TheLayout = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.roomList);
  const deviceList = useSelector((state) => state.deviceList);
  const { user } = useSelector((state) => state.auth);
  console.log(roomList);
  console.log(deviceList);
  useEffect(() => {
    dispatch(connect());
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);
  return user === null ? (
    ""
  ) : user.data.role === "admin" ? (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  ) : user.data.role === "user" ? (
    <div className="c-app c-default-layout">
      {/* <TheSidebar /> */}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default TheLayout;
