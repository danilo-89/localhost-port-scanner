import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import Button from '../common/Button'

const Controls = () => {
    const { state, dispatch } = usePortsForScanningContext()
    const { state: scanningResult, scanPorts } = useScannedPortsContext()

    return (
        <>
            <div className="mb-7 flex justify-between">
                <Button
                    type="button"
                    className="w-[30%]"
                    disabled={scanningResult.isLoading}
                    onClick={() => {
                        scanPorts(state)
                    }}
                >
                    SCAN
                </Button>
                <Button
                    type="button"
                    className="w-[30%]"
                    variation="neutral"
                    disabled={!scanningResult.isLoading}
                    onClick={() => {
                        window.electronAPI.stopScanning()
                    }}
                >
                    STOP
                </Button>
                <Button
                    type="button"
                    className="w-[30%]"
                    variation="secondary"
                    disabled
                >
                    KILL
                </Button>
            </div>
        </>
    )
}

export default Controls
