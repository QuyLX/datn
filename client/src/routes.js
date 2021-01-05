import React from 'react';

const Users = React.lazy(() => import('./containers/Views/Users/Users'));
const User = React.lazy(() => import('./containers/Views/Users/User'));
const Dashboard = React.lazy(() => import('./containers/Views/Dashboard/Dashboard'));
const Devices = React.lazy(() => import('./containers/Views/Devices/Devices'));
const Rooms = React.lazy(() => import('./containers/Views/Rooms/Rooms'));


const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/devices', name: 'Devices', component: Devices },
  { path: '/rooms', name: 'Devices', component: Rooms },
  { path: '/users', exact: true, name: 'User Management', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;