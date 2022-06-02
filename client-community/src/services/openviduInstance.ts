import axios from 'axios';

export const openviduInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENVIDU_SERVER_URL,
  // baseURL: 'https://tooliv.io:4443',
  headers: {
    Authorization:
      'Basic ' +
      btoa('OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
    // btoa('OPENVIDUAPP:' + 'TOOLIV'),
    'Content-Type': 'application/json',
  },
});
