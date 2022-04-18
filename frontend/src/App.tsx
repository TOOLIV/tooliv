import React from 'react';
import AppRouter from './pages/Router';
import reset from './shared/reset';
import { Global } from "@emotion/react";

function App() {
  return (
    <>
      <Global styles={reset} />
      <AppRouter />
    </>
  );
}

export default App;
