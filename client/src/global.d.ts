import { IpcRenderer, DesktopCapturer } from 'electron';
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    desktopCapturer: DesktopCapturer;
    // electron: any;
    env: env;
  }
}
export const { ipcRenderer } = window;
type env = { BASE_URL: string }