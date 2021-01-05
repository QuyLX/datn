import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../../../redux/actions/auth'
const TheHeaderDropdown = ({ user, logout }) =>
  user &&
(
  <CDropdown
    inNav
    className="c-header-nav-items mx-2"
    direction="down"
  >
    <CDropdownToggle className="c-header-nav-link" caret={false}>
      <div >
        {user.data.name}
      </div>
    </CDropdownToggle>
    <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem
        header
        tag="div"
        color="light"
        className="text-center"
      >
        Account
        </CDropdownItem>
        <CDropdownItem onClick={logout} >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Out
        </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
)

TheHeaderDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(TheHeaderDropdown)