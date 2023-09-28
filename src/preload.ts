// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'

// Utilities
import { getStorageItem, setStorageItem } from './utils'

contextBridge.exposeInMainWorld('electronAPI', {
    scanPort: () => {
        ipcRenderer.invoke('scan-port')
    },
    scanPorts: async (portsArray: (number | number[])[]) => {
        return ipcRenderer.invoke('scan-ports', portsArray)
    },

    initPercent: (setState: (arg1: { percentOfScanning: number }) => void) => {
        const stateUpdateHandler = (
            event: IpcRendererEvent,
            newState: number
        ) => {
            setState({ percentOfScanning: newState })
        }

        ipcRenderer.on('scan-ports-progress', stateUpdateHandler)

        // Return a cleanup function to remove the event listener
        return () => {
            ipcRenderer.removeListener(
                'scan-ports-progress',
                stateUpdateHandler
            )
        }
    },
    stopScanning: () => {
        ipcRenderer.invoke('stop-scanning')
    },

    getIP: async () => {
        return await ipcRenderer.invoke('get-ip')
    },

    killPort: async (port: number) => {
        return await ipcRenderer.invoke('kill-port', port)
    },
})

// SHOW REMINDER functionality
const getReminderShown = () => {
    return getStorageItem('reminderShown')
}

// get localstorage value and send it to main
ipcRenderer.send('get-localstorage-reminderShown', getReminderShown())

// save localstorage value if correct value returned in listener
ipcRenderer.on('set-localstorage-reminderShown', (event, value) => {
    if (value === true) {
        setStorageItem('reminderShown', 'true')
    }
    ipcRenderer.removeAllListeners('scan-ports-progress')
})
