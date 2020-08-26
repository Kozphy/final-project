import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_APIPATH,
  timeout: 30000,
});

// Add a request interceptor
request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const setting = config;
    const cookieToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (cookieToken) {
      setting.headers.Authorization = `Bearer ${cookieToken}`;
    }
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error),
);

// Add a response interceptor
request.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response) => response,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  (error) => Promise.reject(error),
);

// 封裝
// function axiosMethod(method, url, data, headers) {
//   return new Promise((resolve, reject) => {
//     request[method](url, data, headers)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((rej) => {
//         reject(rej);
//       });
//   });
// }

// get
export function get(url, data, headers) {
  return request.get(url, data, headers);
}

// post
export function post(url, data, headers) {
  return request.post(url, data, headers);
}

// patch
export function patch(url, data, headers) {
  return request.patch(url, data, headers);
}

// delete
export function del(url, data, headers) {
  return request.delete(url, data, headers);
}
