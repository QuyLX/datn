import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { changeState } from '../../redux/actions/changeState'
import {
    CSidebar,
    CSidebarMinimizer,
} from '@coreui/react'

import { SidebarNav, SidebarBrand } from '../../components/DefaultLayout/Sidebar'

const TheSidebar = ({ sidebarShow, changeState }) => {
    return (
        <CSidebar
        show={sidebarShow}
        onShowChange={(val) => changeState(!val)}
        >
            <SidebarBrand />
            <SidebarNav />
            <CSidebarMinimizer className="c-d-md-down-none" />
        </CSidebar>
    )
}

TheSidebar.propTypes = {
    changeState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    sidebarShow: state.changeState.sidebarShow
})

export default React.memo(connect(mapStateToProps, { changeState })(TheSidebar))