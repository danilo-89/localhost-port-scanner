import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'

// Utilities
import {
    parsePortsForScanning,
    setStorageItem,
    getInitialPortsForScanning,
} from '@/utils'

type StateItem = number | [number, number]

interface IPortsForScanningContext {
    state: StateItem[]
    dispatch: (arg1: { name: 'add' | 'remove'; payload: StateItem }) => void
    portsForScanning: number[]
}

const PortsForScanningContext = createContext<IPortsForScanningContext>({
    state: [],
    dispatch: (_arg1) => null,
    portsForScanning: [],
})

const reducer = (
    state: StateItem[],
    action: { name: 'add' | 'remove'; payload: StateItem }
) => {
    if (action.name === 'add') {
        if (
            typeof action.payload === 'number' &&
            state.includes(action.payload)
        ) {
            console.log('port already added')
            return state
        }
        return [...state, action.payload]
    }
    if (action.name === 'remove' && typeof action.payload === 'number') {
        const copyOfState = [...state]
        copyOfState.splice(action.payload, 1)
        return copyOfState
    }
    return state
}

export function PortsForScanningProvider({
    children,
}: {
    children: ReactNode
}) {
    const [state, dispatch] = useReducer(reducer, [], () =>
        getInitialPortsForScanning()
    )

    const [portsForScanning, setPortsForScanning] = useState([])

    useEffect(() => {
        setStorageItem('portsForScanning', JSON.stringify(state))
        const parsedPorts = parsePortsForScanning(state)

        setPortsForScanning(() => parsedPorts)
    }, [state])

    return (
        <PortsForScanningContext.Provider
            value={{
                state,
                dispatch,
                portsForScanning,
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
