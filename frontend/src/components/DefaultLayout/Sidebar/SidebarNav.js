import React from 'react'
import {
    CCreateElement,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarNavDropdown,
    CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav'

const SideBarNav = () => (
    <CSidebarNav>
        <CCreateElement
            items={navigation}
            components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle
            }}
        />
    </CSidebarNav>
)

export default React.memo(SideBarNav)