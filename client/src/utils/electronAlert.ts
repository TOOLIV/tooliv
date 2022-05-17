import {
  alertConfirmType,
  alertToastType,
} from 'types/common/electronAlertTypes';

export const electronAlert = {
  alertToast: async (opt: alertToastType) =>
    window.ipcRenderer.invoke('ALERT_TOAST', opt),
  alertConfirm: async (opt: alertConfirmType) =>
    window.ipcRenderer.invoke('ALERT_CONFIRM', opt),
};
