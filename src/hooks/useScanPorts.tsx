import { useEffect, useReducer } from 'react'

// Types
import { ScannedPortsState } from '@/types/types'

const reducer = (
    currentState: ScannedPortsState,
    action: Partial<ScannedPortsState>
) => {
    return { ...currentState, ...action }
}

const useScanPorts = () => {
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        isLoading: false,
        percentOfScanning: undefined,
        error: null,
    })

    useEffect(() => {
        // Init state listening and get the cleanup function
        const cleanup = window.electronAPI.initPercent(dispatch)

        // Call the cleanup function on component unmount
        return cleanup
    }, [])

    const scanPorts = async (portsForScanning: (number | number[])[]) => {
        dispatch({
            data: null,
            isLoading: true,
            error: null,
            percentOfScanning: 0,
        })
        try {
            const response =
                await window.electronAPI.scanPorts(portsForScanning)
            dispatch({
                data: response,
            })
        } catch (error: unknown) {
            dispatch({
                error: error,
            })
        } finally {
            dispatch({
                isLoading: false,
            })
        }
    }

    return { state, dispatch, scanPorts }
}

export default useScanPorts
