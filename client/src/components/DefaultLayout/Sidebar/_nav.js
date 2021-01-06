import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'User Management',
        to: '/users',
        icon: 'cil-user'
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Devices',
    to: '/devices',
    icon: <CIcon name="cil-settings" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Rooms',
    to: '/rooms',
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Schedules',
    to: '/schedules',
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'History System',
    to: '/histories',
    icon: <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon" />,
  },
]

