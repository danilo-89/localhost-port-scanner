import { createContext, ReactNode, useContext, useReducer } from 'react'

type StateItem = number | [number, number]

interface IPortsForScanningContext {
    state: StateItem[]
    dispatch: (arg1: StateItem) => void
}

const PortsForScanningContext = createContext<IPortsForScanningContext>({
    state: [],
    dispatch: (_arg1) => null,
})

const reducer = (state: StateItem[], action: StateItem) => {
    if (action !== undefined) {
        return [...state, action]
    }
    return state
}

export function PortsForScanningProvider({
    children,
}: {
    children: ReactNode
}) {
    const [state, dispatch] = useReducer(reducer, [
        [0, 6001],
        9999999999999,
        7000,
    ])

    return (
        <PortsForScanningContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </PortsForScanningContext.Provider>
    )
}

export const usePortsForScanningContext = () => {
    const context = useContext(PortsForScanningContext)

    // error handling (if component is not inside context provider)
    if (context === undefined) {
        throw new Error(
            'usePortsForScanningContext must be used inside a PortsForScanningContext'
        )
    }

    return context
}
