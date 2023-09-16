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
	scanPorts: async () => {
		return ipcRenderer.invoke('scan-ports');
	},

	initPercent: (setState) => {
		console.log('inside initPercent');
		const stateUpdateHandler = (event, newState) => {
			console.log({ receivedState: newState });
			setState(newState);
		};

		ipcRenderer.on('scan-ports-progress', stateUpdateHandler);

		// Return a cleanup function to remove the event listener
		return () => {
			console.log('scan-ports-progress listener cleanup');
			ipcRenderer.removeListener('scan-ports-progress', stateUpdateHandler);
		};
	},
});
