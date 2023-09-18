import ActivePortsWrapper from '@/components/ActivePortsWrapper';
import InfoSection from '@/components/InfoSection';
import PortsToScan from '@/components/PortsToScan';
import ScannedPorts from '@/components/ScannedPorts';

const Home = () => {
	// console.log(range(1, 10));
	// console.log(range(10, 1));

	// const scanPorts = async () => {
	// 	try {
	// 		const response = await window.electronAPI.scanPorts();
	// 		console.log(response);
	// 	} catch (error: unknown) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div>
			<InfoSection />
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
			</div>
			<PortsToScan />
			<ScannedPorts />
		</div>
	);
};

export default Home;
