import React from 'react';

const Users = React.lazy(() => import('../containers/Views/Users/Users'));
const Devices = React.lazy(() => import('../containers/Views/Devices/Devices'));
const Device = React.lazy(() => import('../containers/Views/Devices/Device'));
const Rooms = React.lazy(() => import('../containers/Views/Rooms/RoomsUser'));
const Room = React.lazy(() => import('../containers/Views/Rooms/RoomUser'));
const Schedules = React.lazy(() => import('../containers/Views/Schedule/Schedules'));
const Schedule = React.lazy(() => import('../containers/Views/Schedule/Schedule'));
const Histories = React.lazy(() => import('../containers/Views/History/Histories'));

const routes = [
    { path: '/histories', name: 'Histories', component: Histories },
    { path: '/devices', exact: true, name: 'Devices', component: Devices },
    { path: '/devices/:id', exact: true, name: 'Device', component: Device },
    { path: '/rooms', exact: true, name: 'Rooms', component: Rooms },
    { path: '/rooms/:id', exact: true, name: 'Room', component: Room },
    { path: '/users', exact: true, name: 'User Management', component: Users },
    { path: '/schedules', exact: true, name: 'Schedules', component: Schedules },
    { path: '/schedules/:id', exact: true, name: 'Schedule Details', component: Schedule }
];

export default routes;