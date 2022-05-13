import axios from 'axios';

export const openviduInstance = axios.create({
  baseURL: window.env.BASE_URL + ':4443',
  // baseURL: 'https://k6a402.p.ssafy.io:4443',
  headers: {
    Authorization:
      'Basic ' +
      btoa('OPENVIDUAPP:' + 'TOOLIV'),
    // btoa('OPENVIDUAPP:' + 'TOOLIV'),
    'Content-Type': 'application/json',
  },
});
