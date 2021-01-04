import React from 'react';

const Users = React.lazy(() => import('./containers/Views/Users/Users'));


// Detail
const routes = [
  { path: '/users', name: 'User Management', component: Users },
];

export default routes;