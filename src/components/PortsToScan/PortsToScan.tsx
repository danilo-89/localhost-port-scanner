import useScanPorts from '@/hooks/useScanPorts';
import range from 'lodash.range';
import { useEffect, useReducer, useState } from 'react';

// sortedUniqBy

const reducer = (state: any[], action: number | any[]) => {
	return [...state, action];
};

const PortsToScan = () => {
	const [state, dispatch] = useReducer(reducer, [3000, 3001, 5173]);
	const [inputLeft, setInputLeft] = useState(undefined);
	const [inputRight, setInputRight] = useState(undefined);
	const [inputSingle, setInputSingle] = useState(undefined);
	// const [percent, setPercent] = useState(0);
	const { state: scanningState, scanPorts } = useScanPorts();

	console.log(state);

	const addToState = () => {
		dispatch([inputLeft, inputRight]);
		dispatch(inputSingle);
	};

	// const scanPorts = async () => {
	// 	try {
	// 		const response = await window.electronAPI.scanPorts(state);
	// 		console.log(response);
	// 	} catch (error: unknown) {
	// 		console.log(error);
	// 	}
	// };

	console.log({ scanningState });

	return (
		<div>
			<div>
				<input
					value={inputLeft}
					onChange={(e) => setInputLeft(+e.target.value)}
					className='border'
					type='number'
					name=''
					id=''
				/>{' '}
				-{' '}
				<input
					value={inputRight}
					onChange={(e) => setInputRight(+e.target.value)}
					className='border'
					type='number'
					name=''
					id=''
				/>
			</div>
			<br />
			<div>
				<input
					value={inputSingle}
					onChange={(e) => setInputSingle(+e.target.value)}
					className='border'
					type='number'
					name=''
					id=''
				/>
			</div>
			<br />
			<button type='button' onClick={addToState}>
				add
			</button>

			<div>
				<div>isLoading: {scanningState.isLoading ? 'true' : 'false'}</div>
				<div>percent: {scanningState.percent}</div>
			</div>
			<div>
				<button
					type='button'
					onClick={() => {
						scanPorts(state);
					}}
				>
					Scan Ports
				</button>
			</div>
		</div>
	);
};

export default PortsToScan;
