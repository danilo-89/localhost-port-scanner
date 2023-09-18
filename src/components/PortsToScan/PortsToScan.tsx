import { usePortsForScanningContext } from '@/context/PortsForScanningContext';
import { useScannedPortsContext } from '@/context/ScannedPortsContext';

import range from 'lodash.range';
import { useEffect, useReducer, useState } from 'react';

// sortedUniqBy

const PortsToScan = () => {
	// const [state, dispatch] = useReducer(reducer, [[3000, 9001], 2000]);
	const { state, dispatch } = usePortsForScanningContext();
	const [inputLeft, setInputLeft] = useState(undefined);
	const [inputRight, setInputRight] = useState(undefined);
	const [inputSingle, setInputSingle] = useState(undefined);
	// const [percent, setPercent] = useState(0);
	const { state: scanningResult, scanPorts } = useScannedPortsContext();

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

	console.log({ scanningResult });

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
				<div>isLoading: {scanningResult.isLoading ? 'true' : 'false'}</div>
				<div>percent: {scanningResult.percentOfScanning}</div>
			</div>
			<div>
				<button
					type='button'
					disabled={scanningResult.isLoading}
					onClick={() => {
						scanPorts(state);
					}}
				>
					Scan Ports
				</button>
				<button
					type='button'
					// disabled={scanningResult.isLoading}
					onClick={() => {
						window.electronAPI.stopScanning();
					}}
				>
					Stop Scanning
				</button>
			</div>
		</div>
	);
};

export default PortsToScan;
