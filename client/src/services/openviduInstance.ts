import axios from 'axios';
import isElectron from 'is-electron';

const baseURL = localStorage.getItem('baseURL');

export const openviduInstance = axios.create({
  baseURL: !isElectron()
    ? window.env.BASE_URL
    : JSON.parse(baseURL!).url + ':4443',
  // baseURL: 'https://k6a402.p.ssafy.io:4443',
  headers: {
    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + 'TOOLIV'),
    // btoa('OPENVIDUAPP:' + 'TOOLIV'),
    'Content-Type': 'application/json',
  },
});
