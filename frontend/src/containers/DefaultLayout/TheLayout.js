import React, { useEffect } from "react";
import { TheSidebar, TheFooter, TheHeader, TheContent } from "./index";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "../../redux/actions/mqtt";
const TheLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(connect());
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
