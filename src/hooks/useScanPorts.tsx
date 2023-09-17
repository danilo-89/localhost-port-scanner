import { useEffect, useReducer } from 'react';

const reducer = (currentState: any, action: any) => {
	// if (action.name === 'init') {
	// 	return { ...currentState, isLoading: true, state: null, error: null };
	// }

	return { ...currentState, ...action };
};

const useScanPorts = () => {
	const [state, dispatch] = useReducer(reducer, {
		state: null,
		isLoading: false,
		percent: 0,
		error: null,
	});

	useEffect(() => {
		// Init state listening and get the cleanup function
		const cleanup = window.electronAPI.initPercent(dispatch);

		console.log('inside listener uef');

		// Call the cleanup function on component unmount
		return cleanup;
	}, []);

	const scanPorts = async (portsForScaning: (number | number[])[]) => {
		dispatch({
			state: null,
			isLoading: true,
			error: null,
			percent: 0,
		});
		try {
			const response = await window.electronAPI.scanPorts(portsForScaning);
			console.log(response);
			dispatch({
				state: response,
			});
		} catch (error: unknown) {
			console.log(error);
			dispatch({
				error: error,
			});
		} finally {
			dispatch({
				isLoading: false,
			});
		}
	};

	return { state, dispatch, scanPorts };
};

export default useScanPorts;
