// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
	startServer: () => {
		ipcRenderer.invoke('start-server');
	},
	stopServer: () => {
		ipcRenderer.invoke('stop-server');
	},
	scanPort: () => {
		ipcRenderer.invoke('scan-port');
	},
});
