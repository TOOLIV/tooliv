import styled from '@emotion/styled';
import LoadSpinner from 'atoms/common/LoadSpinner';
import isElectron from 'is-electron';
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import EnterpriseRoute from 'router/EnterpriseRoute';
import Error from './Error';

const Login = lazy(() => import('./Login'));
const Home = lazy(() => import('./Home'));
const Channel = lazy(() => import('./Channel'));
const Meeting = lazy(() => import('./Meeting'));
const UserManagePage = lazy(() => import('./UserManagePage'));
const UserAuthPage = lazy(() => import('./UserAuthPage'));
const PrivateRoute = lazy(() => import('router/PrivateRoute'));
const Main = lazy(() => import('./Main'));
const EnterPriseTest = lazy(() => import('./EnterPriseTest'));
const DM = lazy(() => import('./DM'));

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const AppRouter = () => {
  return (
    <>
      <HashRouter>
        <Suspense
          fallback={
            <Container>
              <LoadSpinner />
            </Container>
          }
        >
          <Routes>
            {isElectron() ? (
              <Route
                path="/login"
                element={
                  <EnterpriseRoute
                    outlet={<Login />}
                    fallback={'enterprisetest'}
                  />
                }
              />
            ) : (
              <Route path="/login" element={<Login />} />
            )}
            {isElectron() && (
              <Route path="/enterprisetest" element={<EnterPriseTest />} />
            )}
            <Route
              path="/"
              element={<PrivateRoute outlet={<Home />} fallback={'login'} />}
            >
              <Route path="/" element={<Navigate replace to="main" />} />
              <Route path="/main" element={<Main />} />
              <Route path="/:workspaceId/:channelId" element={<Channel />} />
              <Route path="/direct/:workspaceId/:channelId" element={<DM />} />
              <Route
                path="/meeting/:workspaceId/:channelId"
                element={<Meeting />}
              />
              <Route path="/admin" element={<Navigate replace to="./auth" />} />
              <Route path="/admin/auth" element={<UserAuthPage />} />
              <Route path="/admin/manage" element={<UserManagePage />} />
              <Route path="/*" element={<Error />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
};

export default AppRouter;
