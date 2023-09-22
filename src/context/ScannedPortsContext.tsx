import { createContext, ReactNode, useContext } from 'react'

// Hooks
import useScanPorts from '@/hooks/useScanPorts'

// Types
import { IScannedPorts } from '@/types/types'

const ScannedPortsContext = createContext<IScannedPorts>({
    state: {
        data: null,
        isLoading: false,
        percentOfScanning: undefined,
        error: null,
    },
    dispatch: (arg1) => null,
    scanPorts: async (arg1) => null,
})

export function ScannedPortsProvider({ children }: { children: ReactNode }) {
    const { state, dispatch, scanPorts } = useScanPorts()

    return (
        <ScannedPortsContext.Provider
            value={{
                state,
                dispatch,
                scanPorts,
            }}
        >
            {children}
        </ScannedPortsContext.Provider>
    )
}

export const useScannedPortsContext = () => {
    const context = useContext(ScannedPortsContext)

    // error handling (if component is not inside context provider)
    if (context === undefined) {
        throw new Error(
            'useScannedPortsContext must be used inside a ScannedPortsContext'
        )
    }

    return context
}
