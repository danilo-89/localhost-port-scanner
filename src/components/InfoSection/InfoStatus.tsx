// Contexts
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import { useSelectedPortContext } from '@/context/SelectedPortContext'

const scanFinished = <span className="text-[#77D48D]">Scanning finished!</span>
const scanStopped = (
    <span className="text-[#d193d2] [&+span]:text-[#d193d2]">
        Scanning stopped at
    </span>
)
const scanInProgress = (
    <span className="text-[#d0ed90] [&+span]:text-[#d0ed90]">
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
                <span className="text-[#90ceed]">
                    Killing port in progress...
                </span>
            </>
        )

    if (killPortResult)
        return (
            <>
                {killPortResult.success ? (
                    <span className="text-[#d193d2]">
                        Port {killPortResult.port} killed successfully.
                    </span>
                ) : (
                    <span className="text-[#fa6a6a]">
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
