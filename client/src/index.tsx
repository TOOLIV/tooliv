import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
