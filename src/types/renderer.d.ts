export interface IElectronAPI {
    startServer: () => void
    stopServer: () => void
    scanPort: () => void
    stopScanning: () => void
    scanPorts: (arg1: (number | number[])[]) => Promise<void>
    getIP: () => Promise<string>
    initPercent: (arg1: Dispatch<{ percentOfScanning: number }>) => void
    killPort: (arg1: number) => Promise<false | any>
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
