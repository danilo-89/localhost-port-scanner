import useScanPorts from '@/hooks/useScanPorts';
import { createContext, ReactNode, useContext, useReducer } from 'react';

const ScannedPortsContext = createContext<any>({
	state: {
		data: null,
		isLoading: false,
		percentOfScanning: undefined,
		error: null,
	},
	dispatch: () => null,
	scanPorts: () => null,
});

export function ScannedPortsProvider({ children }: { children: ReactNode }) {
	const { state, dispatch, scanPorts } = useScanPorts();

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
	);
}

export const useScannedPortsContext = () => {
	const context = useContext(ScannedPortsContext);

	// error handling (if component is not inside context provider)
	if (context === undefined) {
		throw new Error(
			'useScannedPortsContext must be used inside a ScannedPortsContext'
		);
	}

	return context;
};
