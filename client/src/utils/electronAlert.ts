import { alertToastType } from "types/common/electronAlertTypes"

export const electronAlert = {
    alertToast: async (opt: alertToastType) => window.ipcRenderer.invoke('ALERT_TOAST', opt),
    // alertFrame: async () => window.ipcRenderer.invoke('A')
}