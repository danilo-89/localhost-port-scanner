import { getStorageItem } from './storage'
import { z } from 'zod'

const portItemSchema = z.number().int().min(0).max(65535)

const storedPortsForScanningSchema = z.array(
    z.union([
        portItemSchema, // Integer between 0 and 65535
        z
            .tuple([portItemSchema, portItemSchema])
            .refine(([min, max]) => min < max, {
                message: 'The first number must be smaller than the second.',
            }), // Array with two integers where the first is smaller than the second
    ])
)

const defaultPortsForScanning = [
    1,
    [3_000, 11_000],
    // [50_000, 65_535],
    // 9999999999999,
    7000,
    3001,
    // [1000, 3000],
]

export const getInitialPortsForScanning = () => {
    const dataFromStorage = getStorageItem('portsForScanning')

    if (!dataFromStorage) {
        return defaultPortsForScanning
    }

    const parsedDataFromStorage = JSON.parse(dataFromStorage)

    try {
        storedPortsForScanningSchema.parse(parsedDataFromStorage)
        return parsedDataFromStorage
    } catch (err) {
        return defaultPortsForScanning
    }
}
