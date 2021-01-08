import React from 'react'
import {
    CSidebarBrand,
} from '@coreui/react'
const SidebarBrand = () =>
(
    <CSidebarBrand className="d-md-down-none" to="/">

        <span className="h5 c-sidebar-brand-full">Smart Home</span>
        <span className="h5 c-sidebar-brand-minimized">IoT</span>

    </CSidebarBrand>
)
export default React.memo(SidebarBrand)