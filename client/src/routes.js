import React from 'react';

// const Detail = React.lazy(() => import('./containers/Share/Detail/Detail'));
const Users = React.lazy(() => import('./containers/Views/Users/Users/Users'));


// Detail
const routes = [
  { path: '/users/users', name: 'Users', component: Users },
];

export default routes;