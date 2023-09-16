import ActivePortsWrapper from '@/components/ActivePortsWrapper';
import PortsToScan from '@/components/PortsToScan';

const Home = () => {
	// console.log(range(1, 10));
	// console.log(range(10, 1));
	// port ranges: 0 - 1_024 - 65_536
	// The range 0-1023 is reserved by TCP/IP for the "well-known ports", the ones commonly used by system and network services
	// https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

	const scanPorts = async () => {
		try {
			const response = await window.electronAPI.scanPorts();
			console.log(response);
		} catch (error: unknown) {
			console.log(error);
		}
	};

	return (
		<div>
			Home
			<div>
				<ActivePortsWrapper />
			</div>
			<div>
				<button
					type='button'
					onClick={() => {
						window.electronAPI.startServer();
					}}
				>
					Start Server
				</button>
				<button
					type='button'
					onClick={() => {
						window.electronAPI.stopServer();
					}}
				>
					Stop Server
				</button>
				<button
					type='button'
					onClick={() => {
						window.electronAPI.scanPort();
					}}
				>
					Scan Port
				</button>
				<button
					type='button'
					onClick={() => {
						scanPorts();
					}}
				>
					Scan Ports
				</button>
			</div>
			<PortsToScan />
		</div>
	);
};

export default Home;
