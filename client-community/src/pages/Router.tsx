import styled from '@emotion/styled';
import LoadSpinner from 'atoms/common/LoadSpinner';
import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Error from './Error';

const Login = lazy(() => import('./Login'));
const Home = lazy(() => import('./Home'));
const Channel = lazy(() => import('./Channel'));
const Meeting = lazy(() => import('./Meeting'));
const Join = lazy(() => import('./Join'));
const PrivateRoute = lazy(() => import('router/PrivateRoute'));
const Main = lazy(() => import('./Main'));
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
            {/* <Route path="/" element={<Main />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
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
              <Route path="/*" element={<Error />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
};

export default AppRouter;
