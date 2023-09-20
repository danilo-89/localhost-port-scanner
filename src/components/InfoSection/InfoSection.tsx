import { useState } from 'react'
import Modal from '../common/Modal'
import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import Settings from '../Settings'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import SvgCog8Solid from '../icons/SvgCog8Solid'
import Button from '../common/Button'
import clsx from 'clsx'

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

const InfoSection = () => {
    const { state } = usePortsForScanningContext()
    const [showSettings, setShowSettings] = useState(false)
    const { state: scanningResult } = useScannedPortsContext()

    const isValidPercent = typeof scanningResult.percentOfScanning === 'number'

    return (
        <>
            <section className="relative mb-7 flex w-full items-center rounded-lg bg-yankeesBlue p-8">
                <div>
                    <div className="mb-2 text-manatee">
                        Total ports for scanning: <span>{state.length}</span>
                    </div>
                    <div className="text-xl">
                        {getScanningStatus(
                            scanningResult.isLoading,
                            isValidPercent,
                            scanningResult.percentOfScanning
                        )}{' '}
                        <span className="font-bold">
                            {scanningResult.percentOfScanning &&
                            scanningResult.percentOfScanning !== 100
                                ? `${scanningResult.percentOfScanning.toFixed(
                                      2
                                  )}%`
                                : null}
                        </span>
                    </div>
                    <div>
                        {/* <div>isLoading: {scanningResult.isLoading ? 'true' : 'false'}</div> */}
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="ml-auto"
                    variation="transparent"
                >
                    <SvgCog8Solid />
                </Button>

                {isValidPercent ? (
                    <div className="absolute left-0 right-0 top-0 h-1 overflow-hidden rounded-t-lg bg-charcoal">
                        <div
                            className={clsx(
                                'h-full w-full origin-left bg-gradient-to-r from-[#17aaf8] to-[#7ce664]',
                                scanningResult.percentOfScanning !== 0 &&
                                    'transition-transform'
                            )}
                            style={{
                                transform: `scaleX(${scanningResult.percentOfScanning}%)`,
                            }}
                        ></div>
                    </div>
                ) : null}
            </section>
            {showSettings ? (
                <Modal setIsOpen={setShowSettings}>
                    <Settings />
                </Modal>
            ) : null}
        </>
    )
}

export default InfoSection
