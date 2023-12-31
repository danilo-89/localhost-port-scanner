import { HeadersReceivedResponse } from 'electron'

export interface ScannedPortsState {
    data: null | ScanPortResponse[]
    isLoading: boolean
    percentOfScanning: undefined | number
    error: null | { name?: string }
}

export type ScannedPortsDispatch = (arg1: Partial<ScannedPortsState>) => void

export type ScannedPortsScanPorts = (
    arg1: (number | number[])[]
) => Promise<void>

export interface IScannedPorts {
    state: ScannedPortsState
    dispatch: ScannedPortsDispatch
    scanPorts: ScannedPortsScanPorts
}

export interface ScanPortResponse {
    port: number
    statusMessage: undefined | string
    statusCode: undefined | number
    error?: undefined | true
    headers: HeadersReceivedResponse
}

export interface KillPortResult {
    port: number | undefined
    success?: true
    error?: true
    errorMessage?: string
}
