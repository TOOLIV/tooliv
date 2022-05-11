import { Global, ThemeProvider } from '@emotion/react';
import { light, dark } from './shared/theme';
import { useRecoilValue } from 'recoil';
import { appThemeMode } from './recoil/atom';
import './App.css';
import AppRouter from './pages/Router';
import global from './shared/global';
import { useEffect } from 'react';
import { updateUserStatus } from 'api/userApi';

function App() {
  const mode = useRecoilValue(appThemeMode);

  const handleStatus = (statusCode: string) => {
    updateStatus(statusCode);
  };

  const updateStatus = async (statusCode: string) => {
    const body = {
      statusCode,
    };
    const response = await updateUserStatus(body);
    console.log(response);
  };

  useEffect(() => {
    // 로그인시 온라인으로 상태변경
    handleStatus('ONLINE');
  }, []);

  // 브라우저 종료시 상태 OFFLINE으로 변경
  window.addEventListener('beforeunload', () => handleStatus('OFFLINE'));

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
