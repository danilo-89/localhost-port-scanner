import { createContext, ReactNode, useContext, useState } from 'react'

// Types
import { ScanPortResponse } from '@/types/types'

// TS
interface ISelectedPortContext {
    selectedPort: Partial<ScanPortResponse> | null
    killPortResult: any
    setSelectedPort: (arg1: Partial<ScanPortResponse> | null) => void
    setIsPortKilling: any
    setKillPortResult: any
    isPortKilling: boolean
}

const SelectedPortContext = createContext<ISelectedPortContext>({
    selectedPort: null,
    isPortKilling: false,
    killPortResult: null,
    setSelectedPort: (arg1) => null,
    setIsPortKilling: (arg1) => null,
    setKillPortResult: (arg1) => null,
})

export function SelectedPortProvider({ children }: { children: ReactNode }) {
    const [selectedPort, setSelectedPort] = useState(null)
    const [killPortResult, setKillPortResult] = useState(null)
    const [isPortKilling, setIsPortKilling] = useState(false)

    return (
        <SelectedPortContext.Provider
            value={{
                selectedPort,
                setSelectedPort,
                isPortKilling,
                setIsPortKilling,
                killPortResult,
                setKillPortResult,
            }}
        >
            {children}
        </SelectedPortContext.Provider>
    )
}

export const useSelectedPortContext = () => {
    const context = useContext(SelectedPortContext)

    // error handling (if component is not inside context provider)
    if (context === undefined) {
        throw new Error(
            'useSelectedPortContext must be used inside a SelectedPortContext'
        )
    }

    return context
}
