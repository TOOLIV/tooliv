import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Channel from "./Channel";
import Meeting from "./Meeting";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<Navigate replace to="/1/1" />} />
            <Route path="/:workspaceId/:channelId" element={<Channel />} />
            <Route
              path="/meeting/:workspaceId/:channelId"
              element={<Meeting />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
