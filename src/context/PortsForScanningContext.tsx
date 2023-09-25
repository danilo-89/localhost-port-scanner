import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react'
import range from 'lodash.range'
import sortedUniq from 'lodash.sorteduniq'

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
    const [state, dispatch] = useReducer(reducer, [
        [3_000, 11_000],
        // [50_000, 65_535],
        9999999999999,
        7000,
        3001,
        // [1000, 3000],
    ])

    const [portsForScanning, setPortsForScanning] = useState([])

    useEffect(() => {
        const parsedPorts = sortedUniq(
            state
                .reduce((acc, curr) => {
                    if (
                        Array.isArray(curr) &&
                        typeof curr[0] === 'number' &&
                        typeof curr[1] === 'number'
                    ) {
                        return [...acc, ...range(curr[0], curr[1] + 1)]
                    }
                    return [...acc, curr]
                }, [])
                .sort((a, b) => a - b)
        )

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
