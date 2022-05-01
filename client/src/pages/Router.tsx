import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Channel from './Channel';
import Meeting from './Meeting';
import UserManagePage from './UserManagePage';
import UserAuthPage from './UserAuthPage';
import Login from './Login';
import Join from './Join';
import PrivateRoute from 'router/PrivateRoute';
import Main from './Main';
import EnterPriseTest from './EnterPriseTest';
// import Test from './Test';

const AppRouter = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/enterprisetest" element={<EnterPriseTest />} />
          <Route
            path="/"
            element={<PrivateRoute outlet={<Home />} fallback={'login'} />}
          >
            <Route path="" element={<Navigate replace to="/main" />} />
            <Route path="/main" element={<Main />} />
            <Route path="/:workspaceId/:channelId" element={<Channel />} />
            <Route
              path="/meeting/:workspaceId/:channelId"
              element={<Meeting />}
            />
            <Route path="/admin" element={<Navigate replace to="./auth" />} />
            <Route path="/admin/auth" element={<UserAuthPage />} />
            <Route path="/admin/manage" element={<UserManagePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default AppRouter;
