import { app, BrowserWindow, ipcMain, desktopCapturer } from 'electron';
import * as isDev from 'electron-is-dev';
import * as path from 'path';

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 968,
    center: true,
    kiosk: !isDev,
    resizable: true,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: {
      // node환경처럼 사용하기
      nodeIntegration: true,
      // 개발자도구
      devTools: isDev,
      contextIsolation: false,
      preload: __dirname + '/preload.js',
    },
  });

  // require('@electron/remote')
  //   .require('@electron/remote/main')
  //   .enable(mainWindow.webContents);

  // production에서는 패키지 내부 리소스에 접근.
  // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.setResizable(true);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => (mainWindow = undefined!));
  mainWindow.focus();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on(
  'certificate-error',
  (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
  }
);

ipcMain.handle('DESKTOP_CAPTURER_GET_SOURCES', (event, opts) =>
  desktopCapturer.getSources(opts)
);

const Alert = require('electron-alert');

const alert = new Alert();

let alertToastOpt = {
  position: 'top',
  timer: 3000,
  showConfirmButton: false,
};

ipcMain.handle('ALERT_TOAST', (event, opt) => {
  Alert.fireToast({
    ...alertToastOpt,
    title: opt.title,
    icon: opt.icon,
  });
});

let alertConfirmOpt = {
  showCancelButton: true,
};
ipcMain.handle('ALERT_CONFIRM', (event, opt) => {
  alert.fireFrameless(
    {
      ...alertConfirmOpt,
      title: opt.title,
      text: opt.text,
      icon: opt.icon,
    },
    null,
    true,
    false
  );
});
