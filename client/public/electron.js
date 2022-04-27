"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1080,
        height: 720,
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
            preload: __dirname + '/preload.js'
        }
    });
    // require('@electron/remote')
    //   .require('@electron/remote/main')
    //   .enable(mainWindow.webContents);
    // production에서는 패키지 내부 리소스에 접근.
    // 개발 중에는 개발 도구에서 호스팅하는 주소에서 로드.
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : "file://".concat(path.join(__dirname, '../build/index.html')));
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    mainWindow.setResizable(true);
    // Emitted when the window is closed.
    mainWindow.on('closed', function () { return (mainWindow = undefined); });
    mainWindow.focus();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.app.on('certificate-error', function (event, webContents, url, error, certificate, callback) {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    event.preventDefault();
    callback(true);
});
electron_1.ipcMain.handle('DESKTOP_CAPTURER_GET_SOURCES', function (event, opts) {
    return electron_1.desktopCapturer.getSources(opts);
});
