export interface IElectronAPI {
    startServer: () => void
    stopServer: () => void
    scanPort: () => void
    stopScanning: () => void
    scanPorts: (arg1: (number | number[])[]) => Promise<void>
    getIP: () => Promise<string>
    initPercent: (arg1: Dispatch<{ percentOfScanning: number }>) => void
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
