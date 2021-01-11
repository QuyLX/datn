import React from 'react'
import {
  TheSidebar,
  TheFooter,
  TheHeader,
  TheContent
} from './index'
import { useSelector } from 'react-redux'
const TheLayout = () => {
  const { user } = useSelector((state) => state.auth);
  return user === null ? "" : user.data.role === "admin" ? (
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
  ) : user.data.role === "moderator" ? (
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
  ) : <div></div>
}

export default TheLayout
