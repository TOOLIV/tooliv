import { Global, ThemeProvider } from '@emotion/react';
import { light, dark } from './shared/theme';
import { useRecoilValue } from 'recoil';
import { appThemeMode } from './recoil/atom';
import './App.css';
import AppRouter from './pages/Router';
import global from './shared/global';
import { useEffect } from 'react';
import { updateUserStatus } from 'api/userApi';
import { isLoginState } from 'recoil/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const mode = useRecoilValue(appThemeMode);
  const isLogined = useRecoilValue(isLoginState);

  const handleStatus = (statusCode: string) => {
    updateStatus(statusCode);
  };

  const updateStatus = async (statusCode: string) => {
    const body = {
      statusCode,
    };
    const response = await updateUserStatus(body);
  };

  useEffect(() => {
    // 로그인시 온라인으로 상태변경
    if (isLogined) handleStatus('ONLINE');
  }, []);

  // 브라우저 종료시 상태 OFFLINE으로 변경
  window.addEventListener('beforeunload', () => handleStatus('OFFLINE'));
  return (
    <>
      <ThemeProvider theme={mode === 'light' ? light : dark}>
        <Global styles={global} />
        <AppRouter />
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        autoClose={2000}
      />
    </>
  );
}

export default App;
