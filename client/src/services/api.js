// import axios from 'axios';
// import { computeUrl } from '../utils/computeUrl';

// const api = (method, action) => {
//   const url = `http://server.makipos.net:3028/${computeUrl(method, action)}`;

//   const headers = method === 'GET'
//     ? {}
//     : {
//       'Content-Type': 'application/json',
//     };

//   const config = { method, url, headers };

//   if (method !== 'GET') {
//     config.data = action.body;
//   }

//   return axios
//     .request(config)
//     .then(response => response.data);
// };

// export default api;