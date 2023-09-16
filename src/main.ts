import { app, BrowserWindow, ipcMain, net } from 'electron';
import express from 'express';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
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

function scanPort(port: string) {
	return new Promise((resolve, reject) => {
		const request = net.request(`http://localhost:${port}`);
		request.on('response', (response) => {
			// If the request was successful, the port is open
			console.log('the port is open');
			console.log(response);
			console.log(response.headers);
			console.log(response.rawHeaders);

			resolve(true);
		});
		request.on('error', (error) => {
			// If the request failed, the port is closed
			console.log('the port is closed');
			resolve(false);
		});
		request.end();
	});
}

// async function scanPorts(startPort, endPort) {
//   const openPorts = []
//   for (let port = startPort; port <= endPort; port++) {
//     const isOpen = await scanPort(port)
//     if (isOpen) {
//       openPorts.push(port)
//     }
//   }
//   return openPorts
// }

// scanPorts(8000, 9000).then(openPorts => {
//   console.log('Open ports:', openPorts)
// })

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
	return await scanPort('3001');
});

// const kill = require('kill-port')

// kill(port, 'tcp')
//   .then(console.log)
//   .catch(console.log)
