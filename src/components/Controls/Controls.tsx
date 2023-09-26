import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import Button from '../common/Button'
import { useSelectedPortContext } from '@/context/SelectedPortContext'

const Controls = () => {
    const { state, dispatch, portsForScanning } = usePortsForScanningContext()
    const { state: scanningResult, scanPorts } = useScannedPortsContext()
    const {
        selectedPort,
        setKillPortResult,
        killPortResult,
        isPortKilling,
        setIsPortKilling,
    } = useSelectedPortContext()

    console.log({ selectedPort })
    console.log({ killPortResult })

    const killPortHandler = async () => {
        setIsPortKilling(true)
        setKillPortResult(null)
        try {
            await window.electronAPI.killPort(selectedPort?.port)
            setKillPortResult({
                port: selectedPort?.port,
                success: true,
            })
        } catch (error) {
            setKillPortResult({
                port: selectedPort?.port,
                errorMessage: error?.message?.replace(
                    "Error invoking remote method 'kill-port': ",
                    ''
                ),
                error: true,
            })
        } finally {
            setIsPortKilling(false)
        }
    }

    return (
        <>
            <div className="mb-7 flex justify-between">
                <Button
                    type="button"
                    className="w-[30%]"
                    disabled={
                        scanningResult.isLoading ||
                        !portsForScanning.length ||
                        isPortKilling
                    }
                    onClick={() => {
                        setKillPortResult(null)
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
                    disabled={
                        !selectedPort ||
                        isPortKilling ||
                        scanningResult.isLoading
                    }
                    onClick={() => killPortHandler()}
                >
                    KILL
                </Button>
            </div>
        </>
    )
}

export default Controls
