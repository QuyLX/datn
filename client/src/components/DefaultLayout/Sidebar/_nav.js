import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon  name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Device',
    icon: 'cil-laptop',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Properties',
        to: '/devices/properties',
        icon: 'cil-scrubber'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Type Device',
        to: '/devices/type',
        icon: 'cil-scrubber'

      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Type Device Override',
        to: '/devices/override',
        icon: 'cil-scrubber'

      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Devices',
        to: '/devices/devices',
        icon: 'cil-scrubber'

      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Update',
        to: '/devices/update',
        icon: 'cil-scrubber'

      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Users',
    icon: 'cil-people',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/users/users',
        icon: 'cil-user'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Role',
        to: '/users/role',
        icon: 'cil-user-follow'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'User block',
        to: '/users/user-block',
        icon: 'cil-user-unfollow'
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Statistic',
    to: '/statistic',
    icon: 'cil-calculator'
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Manufacturers',
    to: '/manufacturers',
    icon: 'cil-home'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Commercial',
    icon: 'cil-graph',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'License Key',
        to: '/commercial/keyLicenses',
        icon: 'cil-list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Machine',
        to: '/commercial/machine',
        icon: 'cil-home',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Automatic-plugin',
    to: '/automatic-plugins',
    icon: 'cil-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'FeedBack',
    to: '/feedbacks',
    icon: 'cil-speech',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Quality testing',
    to: '/qcld',
    icon: 'cil-star',
  },
  {
    _tag: 'CSidebarNavDivider'
  },
]

