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
import { useSelector } from 'react-redux'
import navigation from './_nav'
import navUser from './_navUser'


const SideBarNav = () => {
    const { user } = useSelector((state) => state.auth);
    return user === null ? "" : user.data.role === "admin" ? (
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
    ) : user.data.role === "user" ? (<CSidebarNav>
        <CCreateElement
            items={navUser}
            components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle
            }}
        />
    </CSidebarNav>) : user.data.role === "moderator" ? (<CSidebarNav>
        <CCreateElement
            items={navigation}
            components={{
                CSidebarNavDivider,
                CSidebarNavDropdown,
                CSidebarNavItem,
                CSidebarNavTitle
            }}
        />
    </CSidebarNav>) : ""
}

export default React.memo(SideBarNav)