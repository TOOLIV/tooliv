import React from 'react';
import AppRouter from './pages/Router';
import global from './shared/global';
import './App.css';
import { Global, ThemeProvider } from '@emotion/react';
import { light, dark } from './shared/theme';
import { useRecoilValue } from 'recoil';
import { appThemeMode } from './recoil/atom';

function App() {
  const mode = useRecoilValue(appThemeMode);
  return (
    <>
      <ThemeProvider theme={mode === 'light' ? light : dark}>
        <Global styles={global} />
        <AppRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
