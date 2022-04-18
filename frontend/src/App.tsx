import React from "react";
import AppRouter from "./pages/Router";
import global from "./shared/global";
import { Global } from "@emotion/react";

function App() {
  return (
    <>
      <Global styles={global} />
      <AppRouter />
    </>
  );
}

export default App;
