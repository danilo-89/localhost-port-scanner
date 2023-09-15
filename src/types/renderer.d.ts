export interface IElectronAPI {
	startServer: () => void;
	stopServer: () => void;
	scanPort: () => void;
}

declare global {
	interface Window {
		electronAPI: IElectronAPI;
	}
}
