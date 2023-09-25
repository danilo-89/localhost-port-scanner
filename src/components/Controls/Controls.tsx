import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import Button from '../common/Button'
import { useSelectedPortContext } from '@/context/SelectedPortContext'

const Controls = () => {
    const { state, dispatch, portsForScanning } = usePortsForScanningContext()
    const { state: scanningResult, scanPorts } = useScannedPortsContext()
    const { selectedPort } = useSelectedPortContext()

    console.log({ selectedPort })

    return (
        <>
            <div className="mb-7 flex justify-between">
                <Button
                    type="button"
                    className="w-[30%]"
                    disabled={
                        scanningResult.isLoading || !portsForScanning.length
                    }
                    onClick={() => {
                        scanPorts(portsForScanning)
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
                    disabled={!selectedPort}
                    onClick={async () =>
                        console.log(
                            // selectedPort?.port
                            await window.electronAPI.killPort(
                                selectedPort?.port
                            )
                        )
                    }
                >
                    KILL
                </Button>
            </div>
        </>
    )
}

export default Controls
