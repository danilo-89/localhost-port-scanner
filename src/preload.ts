// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
    startServer: () => {
        ipcRenderer.invoke('start-server')
    },
    stopServer: () => {
        ipcRenderer.invoke('stop-server')
    },
    scanPort: () => {
        ipcRenderer.invoke('scan-port')
    },
    scanPorts: async (portsArray: (number | number[])[]) => {
        return ipcRenderer.invoke('scan-ports', portsArray)
    },

    initPercent: (setState) => {
        console.log('inside initPercent')
        const stateUpdateHandler = (event, newState) => {
            console.log({ receivedState: newState })
            setState({ percentOfScanning: newState })
        }

        ipcRenderer.on('scan-ports-progress', stateUpdateHandler)

        // Return a cleanup function to remove the event listener
        return () => {
            console.log('scan-ports-progress listener cleanup')
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
})
