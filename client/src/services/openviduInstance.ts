import axios from 'axios';
import isElectron from 'is-electron';

const baseURL = localStorage.getItem('baseURL');

export const openviduInstance = axios.create({
  baseURL: !isElectron() ? 'https://tooliv.io' : JSON.parse(baseURL!).url,
  headers: {
    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + 'TOOLIV'),
    'Content-Type': 'application/json',
  },
});
