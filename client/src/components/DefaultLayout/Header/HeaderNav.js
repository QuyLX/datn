import React from 'react'
import {
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
} from '@coreui/react'

import {
    TheHeaderDropdown
} from './DropDown'

const HeaderNav = () =>
    (
        <>
            <CHeaderNav className="d-md-down-none mr-auto">
                <CHeaderNavItem className="px-3" >
                    <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
                </CHeaderNavItem>
            </CHeaderNav>
            <CHeaderNav className="px-3">
                <TheHeaderDropdown />
            </CHeaderNav>
        </>
    )


export default HeaderNav