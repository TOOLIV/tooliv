import axios from 'axios';

export const openviduInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENVIDU_SERVER_URL,
  // baseURL: 'https://k6a402.p.ssafy.io:4443',
  headers: {
    Authorization:
      'Basic ' +
      btoa('OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
    // btoa('OPENVIDUAPP:' + 'TOOLIV'),
    'Content-Type': 'application/json',
  },
});
