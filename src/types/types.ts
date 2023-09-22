import { HeadersReceivedResponse } from 'electron'

export interface ScannedPortsState {
    data: null | any
    isLoading: boolean
    percentOfScanning: undefined | number
    error: null | any
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
    error: undefined | true
    headers: HeadersReceivedResponse
}
