// Contexts
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import { useSelectedPortContext } from '@/context/SelectedPortContext'

const scanFinished = (
    <span className="text-pastelGreen">Scanning finished!</span>
)
const scanStopped = (
    <span className="text-grayishMagenta [&+span]:text-grayishMagenta">
        Scanning stopped at
    </span>
)
const scanInProgress = (
    <span className="text-crayola [&+span]:text-crayola">
        Scanning in progress:
    </span>
)

const getScanningStatus = (
    isLoading: boolean,
    isValidPercent: boolean,
    percent: number | undefined
) => {
    if (!isLoading && isValidPercent) {
        if (percent === 100) {
            return scanFinished
        } else {
            return scanStopped
        }
    }
    if (isLoading && isValidPercent) return scanInProgress
    return 'Ready for scanning'
}

const InfoStatus = () => {
    const { killPortResult, isPortKilling } = useSelectedPortContext()
    const { state: scanningResult } = useScannedPortsContext()

    const isValidPercent = typeof scanningResult.percentOfScanning === 'number'

    if (isPortKilling)
        return (
            <>
                <span className="text-cornflower">
                    Killing port in progress...
                </span>
            </>
        )

    if (killPortResult)
        return (
            <>
                {killPortResult.success ? (
                    <span className="text-grayishMagenta">
                        Port {killPortResult.port} killed successfully.
                    </span>
                ) : (
                    <span className="text-pastelRed">
                        {killPortResult.errorMessage}
                    </span>
                )}
            </>
        )

    return (
        <>
            {getScanningStatus(
                scanningResult.isLoading,
                isValidPercent,
                scanningResult.percentOfScanning
            )}{' '}
            <span className="font-bold">
                {scanningResult.percentOfScanning &&
                scanningResult.percentOfScanning !== 100
                    ? `${scanningResult.percentOfScanning.toFixed(2)}%`
                    : null}
            </span>
        </>
    )
}

export default InfoStatus
