import { createContext, ReactNode, useContext, useState } from 'react'

// Types
import { ScanPortResponse } from '@/types/types'

// TS
interface ISelectedPortContext {
    selectedPort: Partial<ScanPortResponse> | null
    setSelectedPort: (arg1: Partial<ScanPortResponse> | null) => void
}

const SelectedPortContext = createContext<ISelectedPortContext>({
    selectedPort: {},
    setSelectedPort: (arg1) => null,
})

export function SelectedPortProvider({ children }: { children: ReactNode }) {
    const [selectedPort, setSelectedPort] = useState(null)

    return (
        <SelectedPortContext.Provider
            value={{
                selectedPort,
                setSelectedPort,
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
