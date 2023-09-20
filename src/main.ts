import { app, BrowserWindow, ipcMain, net } from 'electron';
import os from 'os';
import express from 'express';
import range from 'lodash.range';
import path from 'path';

// Error: net::ERR_CONNECTION_REFUSED
// ERR_ADDRESS_INVALID - port 0
// ERR_UNSAFE_PORT - port 1

const parseError = (errorValue: string) => {
	switch (errorValue) {
		case 'net::ERR_ADDRESS_INVALID':
			return 'Address Invalid';
		case 'net::ERR_UNSAFE_PORT':
			return 'Unsafe Port';
		default:
			return errorValue;
	}
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
		);
	}

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Ensure app quits on close
	mainWindow.on('close', () => {
		app.quit();
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
let server: any;

ipcMain.handle('start-server', () => {
	console.log('inside start-server');
	if (!server) {
		const app = express();
		app.get('/', (req, res) => {
			res.send('Hello World!');
		});

		server = app.listen(3001, () => {
			console.log(`Server running at http://localhost:3001/`);
		});
	}

	return 'Server started';
});

function scanPort(port: number) {
	return new Promise((resolve, reject) => {
		try {
			const url = `http://localhost:${port}`;
			new URL(url); // Attempt to parse the URL

			const request = net.request(url);
			request.on('response', (response) => {
				// If the request was successful, the port is open
				console.log(port, 'the port is open');
				console.log(response);
				console.log(response.headers);
				console.log(response.rawHeaders);

				resolve(response);
			});
			request.on('error', (error) => {
				console.log('error occured', port);
				console.log('error occured');
				// If the request failed, the port is maybe closed
				console.log(error);
				console.log(error.message);
				console.log(error.name);
				console.log(port, 'the port is closed');
				if (error.message === 'net::ERR_CONNECTION_REFUSED') {
					resolve(false);
				} else {
					resolve({
						port: port,
						statusMessage: parseError(error.message),
						statusCode: undefined,
						error: true,
						headers: {},
					});
				}
			});
			request.end();
		} catch (error) {
			resolve({
				port: port,
				statusMessage: parseError(error.message),
				statusCode: undefined,
				error: true,
				headers: {},
			});
			console.log('cauth');
			console.log(error);
		}
	});
}

let portsAreScanning = false;
let shouldContinueScanning = true;

async function scanPorts(portsToScan: number[]) {
	const openPorts = [];
	const totalPorts = portsToScan.length;
	// const totalPorts = endPort - startPort + 1;

	// console.log(totalPorts);
	// return;

	if (portsAreScanning) {
		console.log('Ports are already scanning!');
		throw new Error('Ports are already scanning!');
	}

	portsAreScanning = true;
	shouldContinueScanning = true;

	// [3000, 3001].forEach((port) => {
	// 	const response = await scanPort(port);
	// 	if (response) {
	// 		openPorts.push({
	// 			port,
	// 			statusCode: response?.statusCode,
	// 			statusMessage: response?.statusMessage,
	// 			headers: response?.headers,
	// 		});
	// 	}

	// 	// Calculate and call the progress callback
	// 	const percentComplete = ((port - startPort + 1) / totalPorts) * 100;
	// 	// console.log({ percentComplete });
	// 	mainWindow?.webContents.send('scan-ports-progress', percentComplete);
	// });
	// for (let port = startPort; port <= endPort; port++) {
	// 	const response = await scanPort(port);
	// 	if (response) {
	// 		openPorts.push({
	// 			port,
	// 			statusCode: response?.statusCode,
	// 			statusMessage: response?.statusMessage,
	// 			headers: response?.headers,
	// 		});
	// 	}

	// 	// Calculate
	// 	const percentComplete = ((port - startPort + 1) / totalPorts) * 100;
	// 	// console.log({ percentComplete });
	// 	mainWindow?.webContents.send('scan-ports-progress', percentComplete);
	// }
	let index = 0;

	for (const port of portsToScan) {
		index++;

		// Check if the flag is set to false, and if so, stop scanning
		if (!shouldContinueScanning) {
			console.log('Scanning stopped.');
			break;
		}

		const response = await scanPort(port);
		if (response) {
			openPorts.push({
				port,
				statusCode: response?.statusCode,
				statusMessage: response?.statusMessage,
				headers: response?.headers,
				error: response?.error,
			});
		}

		// Calculate and call the progress callback
		const percentComplete = (index / totalPorts) * 100;
		console.log({ index }, { totalPorts });
		mainWindow?.webContents.send('scan-ports-progress', percentComplete);
	}

	console.log({ portsToScan });
	console.log({ openPorts });
	portsAreScanning = false;
	return openPorts;
}

// scanPorts(8000, 9000).then((openPorts) => {
// 	console.log('Open ports:', openPorts);
// });

// 404 error when getting port
// This can happen for a number of reasons, such as:

// The path you're trying to reach doesn't exist on the server. The server is running, but there's no content at the specific path you're requesting. This can be the case if there's a typo in your path, or if you're requesting a path that hasn't been defined in your server's routing rules stackoverflow.com.
// The server is not setup to respond to the type of request you're making. For example, you might be making a GET request to a path that only responds to POST requests.

// port ranges: 0 - 1_024 - 65_536
// The range 0-1023 is reserved by TCP/IP for the "well-known ports", the ones commonly used by system and network services
// https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

ipcMain.handle('scan-ports-progress', (event, percentComplete) => {
	return percentComplete;
});

ipcMain.handle('stop-server', () => {
	if (server) {
		server.close(() => {
			console.log('Server stopped');
		});
		server = null;
	}

	return 'Server stopped';
});

ipcMain.handle('scan-port', async () => {
	// Error: net::ERR_CONNECTION_REFUSED
	// ERR_ADDRESS_INVALID - port 0
	// ERR_UNSAFE_PORT - port 1
	return await scanPort(11);
});

const parsePortsForScaning = (portsArray: (number | number[])[]) => {
	return [].concat(
		...portsArray.map((item) => {
			if (
				Array.isArray(item) &&
				item.length === 2 &&
				typeof item[0] === 'number' &&
				typeof item[1] === 'number'
			) {
				return range(item[0], item[1]);
			}
			return item;
		})
	);
};

ipcMain.handle('scan-ports', async (event, portsArray) => {
	return await scanPorts(parsePortsForScaning(portsArray));
});

ipcMain.handle('stop-scanning', () => {
	shouldContinueScanning = false;
	return 'Scanning will stop.';
});

function getLocalhostAddress() {
	const networkInterfaces = os.networkInterfaces();
	const addresses = [];

	// Loop through network interfaces to find the IPv4 addresses
	Object.keys(networkInterfaces).forEach((iface) => {
		networkInterfaces[iface].forEach((details) => {
			if (details.family === 'IPv4' && !details.internal) {
				addresses.push(details.address);
			}
		});
	});

	console.log(addresses);
	return addresses.join(', ');
}

ipcMain.handle('get-ip', () => {
	return getLocalhostAddress();
});

// const kill = require('kill-port')

// kill(port, 'tcp')
//   .then(console.log)
//   .catch(console.log)
