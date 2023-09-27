import { useState } from 'react'
import Modal from '../common/Modal'
import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import Settings from '../Settings'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import SvgCog8Solid from '../icons/SvgCog8Solid'
import Button from '../common/Button'
import clsx from 'clsx'
import InfoStatus from './InfoStatus'

const InfoSection = () => {
    const { portsForScanning } = usePortsForScanningContext()
    const [showSettings, setShowSettings] = useState(false)
    const { state: scanningResult } = useScannedPortsContext()

    const isValidPercent = typeof scanningResult.percentOfScanning === 'number'

    return (
        <>
            <section className="relative mb-7 flex w-full items-center rounded-lg bg-yankeesBlue p-8">
                <div>
                    <div className="mb-2 text-manatee">
                        Total ports for scanning:{' '}
                        <span>
                            {portsForScanning.length ||
                                '0 - select ports for scanning'}
                        </span>
                    </div>
                    <div className="text-xl">
                        <InfoStatus />
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="ml-auto"
                    variation="transparent"
                    disabled={scanningResult.isLoading}
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
