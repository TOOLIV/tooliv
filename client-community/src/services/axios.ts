import axios, { AxiosInstance } from 'axios';
import isElectron from 'is-electron';
import { setRecoil } from 'recoil-nexus';
import { user } from 'recoil/auth';

let instance: AxiosInstance;
const baseURL = localStorage.getItem('baseURL');

if (isElectron() && baseURL) {
  instance = axios.create({
    baseURL: JSON.parse(baseURL).url + '/api',
    // TODO timeout 설정
    timeout: 30000,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
} else {
  instance = axios.create({
    baseURL: process.env.REACT_APP_TEST_API_URL,
    // TODO timeout 설정
    timeout: 30000,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  });
}

/* Apply Interceptor */
// HTTP request interceptor
instance.interceptors.request.use(
  (config) => {
    // 추후 로그인 구현시 주석 해제
    const user = localStorage.getItem('tooliv_info');
    if (user) {
      const Juser = JSON.parse(user);
      if (Juser.accessToken) {
        config.headers!.Authorization = 'Bearer ' + Juser.accessToken;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
    // return false;
  }
);

// HTTP response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        /* 'JWT expired' exeption */
        case 400:
          // console.log('400 ERROR, not authorized.');
          break;
        case 401:
          // console.log('401 ERROR, not authorized.');
          localStorage.removeItem('tooliv_info');
          setRecoil(user, {
            accessToken: '',
            email: '',
            name: '',
            nickname: '',
            userId: '',
            profileImage: '',
            statusCode: '',
          });
          break;
        case 404:
          // console.log('404error!');
          break;
        case 409:
          // console.log('409error!');
          break;
        default:
      }
    }
    return Promise.reject(error);
    // return false;
  }
);

export const multipartInstance = axios.create({
  baseURL: process.env.REACT_APP_TEST_API_URL,
  // TODO timeout 설정
  timeout: 30000,
  headers: {
    'Content-Type': `multipart/form-data`,
  },
});

export default instance;
