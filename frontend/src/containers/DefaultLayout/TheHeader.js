import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeState } from '../../redux/actions/changeState'
import {
  CHeader,
  CToggler,
} from '@coreui/react'
import { HeaderNav, HeaderBrand, SubHeader } from '../../components/DefaultLayout/Header'

 
const TheHeader = ({ sidebarShow, changeState }) => {
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    changeState(val)
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    changeState(val)
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <HeaderBrand />
      <HeaderNav />
      <SubHeader />
    </CHeader>
  )
}

TheHeader.propType = {
  changeState: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  sidebarShow: state.changeState.sidebarShow,
  user: state.auth.user
})

export default connect(mapStateToProps, { changeState })(TheHeader)