import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import dropItem from './_dropdownItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../../../redux/actions/auth'
const TheHeaderDropdown = ({ auth:{user}, logout }) =>  
user.username &&
(
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div >
          {user.username}
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
        {dropItem.map(item => (
          <CDropdownItem key={item.id}>
            {item.icon}
            {item.name}
          </CDropdownItem>
        ))}
        <CDropdownItem divider />
        <CDropdownItem onClick={logout}>
          <CIcon  name="cil-lock-locked" className="mfe-2" />
          Lock Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )


TheHeaderDropdown.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(TheHeaderDropdown)