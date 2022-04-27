import { IpcRenderer, DesktopCapturer } from 'electron';
declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
    desktopCapturer: DesktopCapturer;
    // electron: any;
  }
}
export const { ipcRenderer } = window;
