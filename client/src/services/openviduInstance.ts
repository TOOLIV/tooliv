import axios from 'axios';

export const openviduInstance = axios.create({
  baseURL: process.env.REACT_APP_OPENVIDU_SERVER_URL,
  headers: {
    Authorization:
      'Basic ' +
      btoa('OPENVIDUAPP:' + process.env.REACT_APP_OPENVIDU_SERVER_SECRET),
    'Content-Type': 'application/json',
  },
});
