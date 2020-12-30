import React from 'react'
import {
    CSidebarBrand,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
const SidebarBrand = () =>
    (
        <CSidebarBrand className="d-md-down-none" to="/">
            <CIcon
                className="c-sidebar-brand-full"
                name="logo-negative"
                height={35}
            />
            <CIcon
                className="c-sidebar-brand-minimized"
                name="sygnet"
                height={35}
            />
        </CSidebarBrand>

    )
export default React.memo(SidebarBrand)