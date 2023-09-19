import { useEffect, useState } from 'react';

const Footer = () => {
	const [ipAddress, setIpAddress] = useState(undefined);

	console.log(ipAddress);

	useEffect(() => {
		const provideGetIP = async () => {
			try {
				setIpAddress(await window.electronAPI.getIP());
			} catch (error) {
				setIpAddress(undefined);
			}
		};

		provideGetIP();
	}, []);

	return (
		<footer className='fixed bottom-0 left-0 right-0 px-3 py-1 text-[gray] bg-[#2a2e3b] flex justify-between text-sm'>
			<div>localhost: {ipAddress}</div>
			<button>refresh</button>
		</footer>
	);
};

export default Footer;
