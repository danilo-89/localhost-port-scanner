import React from 'react';

const Home = () => {
	return (
		<div>
			Home
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
		</div>
	);
};

export default Home;
