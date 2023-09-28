import { useState } from 'react'

// Contexts
import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
import { useSelectedPortContext } from '@/context/SelectedPortContext'

// Components
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'

// Types
import { ScanPortResponse } from '@/types/types'

const Controls = () => {
    const { portsForScanning } = usePortsForScanningContext()
    const {
        state: scanningResult,
        scanPorts,
        dispatch,
    } = useScannedPortsContext()
    const {
        selectedPort,
        setSelectedPort,
        setKillPortResult,
        isPortKilling,
        setIsPortKilling,
    } = useSelectedPortContext()

    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const killPortHandler = async () => {
        setShowConfirmModal(false)
        setIsPortKilling(true)
        setKillPortResult(null)
        try {
            const response = await window.electronAPI.killPort(
                selectedPort?.port
            )

            setKillPortResult({
                port: selectedPort?.port,
                success: true,
            })

            // replace data for the successfully killed port
            dispatch({
                data: scanningResult.data.map(
                    (item: Partial<ScanPortResponse>) => {
                        if (response && item.port === response?.[0]?.port) {
                            return response[0]
                        }
                        return item
                    }
                ),
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
                        setSelectedPort(null)
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
                    onClick={() => setShowConfirmModal(true)}
                >
                    KILL
                </Button>
            </div>

            {showConfirmModal && selectedPort ? (
                <Modal setIsOpen={setShowConfirmModal}>
                    <div className="w-[30rem] bg-yankeesBlue">
                        <div className="mb-4 bg-darkGunmetal p-4">
                            <h2 className="text-lg font-bold">
                                Confirm action
                            </h2>
                        </div>{' '}
                        <div className="p-5 text-center">
                            <div className="mb-8 text-lg">
                                Try to kill process that is
                                <br /> running on the port{' '}
                                <span className="rounded-md bg-charcoal px-2 font-bold">
                                    {selectedPort.port}
                                </span>{' '}
                                ?
                            </div>
                            <Button
                                variation="neutral"
                                onClick={killPortHandler}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    )
}

export default Controls
