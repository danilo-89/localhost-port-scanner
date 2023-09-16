import range from 'lodash.range';
import { useEffect, useReducer, useState } from 'react';

const reducer = (state: any[], action: number | any[]) => {
	return [...state, action];
};

const PortsToScan = () => {
	const [state, dispatch] = useReducer(reducer, []);
	const [inputLeft, setInputLeft] = useState(undefined);
	const [inputRight, setInputRight] = useState(undefined);
	const [inputSingle, setInputSingle] = useState(undefined);
	const [percent, setPercent] = useState(0);

	console.log(state);

	const addToState = () => {
		dispatch([inputLeft, inputRight]);
		dispatch(inputSingle);
	};

	useEffect(() => {
		// Init state listening and get the cleanup function
		const cleanup = window.electronAPI.initPercent(setPercent);

		// Call the cleanup function on component unmount
		return cleanup;
	}, []);

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
				<span>{percent}</span>
			</div>
		</div>
	);
};

export default PortsToScan;
