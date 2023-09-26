import { app, BrowserWindow, ipcMain, net, shell } from 'electron'
import path from 'path'
import os from 'os'
import express from 'express'
import { Server, IncomingMessage, ServerResponse } from 'http'
import range from 'lodash.range'
import kill from 'kill-port'
import genericPool from 'generic-pool'

// Utilities
import { parseError } from './utils'

// Types
import { ScanPortResponse } from './types/types'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit()
}

let mainWindow: BrowserWindow

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
            )
        )
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    // Ensure app quits on close
    mainWindow.on('close', () => {
        app.quit()
    })

    mainWindow.webContents.setWindowOpenHandler(({ url }: { url: string }) => {
        handleUrl(url)
        return { action: 'deny' }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Intercept a click on anchor (ideally with `target="_blank"`)
// This replaces 'new-window' event which is being deprecated
async function handleUrl(url: string) {
    const parsedUrl = maybeParseUrl(url)
    if (!parsedUrl) {
        return
    }

    const { protocol } = parsedUrl
    // We could handle all possible link cases here, not only http/https
    if (protocol === 'http:' || protocol === 'https:') {
        try {
            await shell.openExternal(url)
        } catch (error: unknown) {
            console.error(`Failed to open url: ${error}`)
        }
    }
}

function maybeParseUrl(value: string): URL | undefined {
    if (typeof value === 'string') {
        try {
            return new URL(value)
        } catch (err) {
            // Errors are ignored, as we only want to check if the value is a valid url
            console.error(`Failed to parse url: ${value}`)
        }
    }

    return undefined
}

let server: Server<typeof IncomingMessage, typeof ServerResponse>

ipcMain.handle('start-server', () => {
    console.log('inside start-server')
    if (!server) {
        const app = express()
        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        server = app.listen(3001, () => {
            console.log(`Server running at http://localhost:3001/`)
        })
    }

    return 'Server started'
})

// SCAN PORT functionality
function scanPort(port: number) {
    return new Promise((resolve, reject) => {
        try {
            const url = `http://localhost:${port}`
            new URL(url) // Attempt to parse the URL

            const request = net.request(url)
            request.on('response', (response) => {
                // If the request was successful, the port is open
                console.log(port, 'the port is open')
                console.log(response)
                console.log(response.headers)
                console.log(response.rawHeaders)

                resolve(response)
            })
            request.on('error', (error) => {
                console.log('error occurred', port)
                console.log('error occurred')
                // If the request failed, the port is maybe closed
                console.log(error)
                console.log(error.message)
                console.log(error.name)
                console.log(port, 'the port is closed')
                if (error.message === 'net::ERR_CONNECTION_REFUSED') {
                    // resolve(false)
                    resolve({
                        port: port,
                        statusMessage: parseError(error?.message),
                        statusCode: undefined,
                        error: true,
                        headers: {},
                    })
                } else {
                    resolve({
                        port: port,
                        statusMessage: parseError(error?.message),
                        statusCode: undefined,
                        error: true,
                        headers: {},
                    })
                }
            })
            request.end()
        } catch (error) {
            resolve({
                port: port,
                statusMessage: parseError(error?.message),
                statusCode: undefined,
                error: true,
                headers: {},
            })
            console.log('caught')
            console.log(error)
        }
    })
}

let portsAreScanning = false
let shouldContinueScanning = true

// async function scanPorts(portsToScan: number[]) {
//     const openPorts = []
//     const totalPorts = portsToScan.length
//     // const totalPorts = endPort - startPort + 1;

//     // console.log(totalPorts);
//     // return;

//     if (portsAreScanning) {
//         console.log('Ports are already scanning!')
//         throw new Error('Ports are already scanning!')
//     }

//     portsAreScanning = true
//     shouldContinueScanning = true

//     // [3000, 3001].forEach((port) => {
//     // 	const response = await scanPort(port);
//     // 	if (response) {
//     // 		openPorts.push({
//     // 			port,
//     // 			statusCode: response?.statusCode,
//     // 			statusMessage: response?.statusMessage,
//     // 			headers: response?.headers,
//     // 		});
//     // 	}

//     // 	// Calculate and call the progress callback
//     // 	const percentComplete = ((port - startPort + 1) / totalPorts) * 100;
//     // 	// console.log({ percentComplete });
//     // 	mainWindow?.webContents.send('scan-ports-progress', percentComplete);
//     // });
//     // for (let port = startPort; port <= endPort; port++) {
//     // 	const response = await scanPort(port);
//     // 	if (response) {
//     // 		openPorts.push({
//     // 			port,
//     // 			statusCode: response?.statusCode,
//     // 			statusMessage: response?.statusMessage,
//     // 			headers: response?.headers,
//     // 		});
//     // 	}

//     // 	// Calculate
//     // 	const percentComplete = ((port - startPort + 1) / totalPorts) * 100;
//     // 	// console.log({ percentComplete });
//     // 	mainWindow?.webContents.send('scan-ports-progress', percentComplete);
//     // }
//     let index = 0

//     for (const port of portsToScan) {
//         index++

//         // Check if the flag is set to false, and if so, stop scanning
//         if (!shouldContinueScanning) {
//             console.log('Scanning stopped.')
//             break
//         }

//         const response = (await scanPort(port)) as false | ScanPortResponse
//         if (response) {
//             openPorts.push({
//                 port,
//                 statusCode: response?.statusCode,
//                 statusMessage: response?.statusMessage,
//                 headers: response?.headers,
//                 error: response?.error,
//             })
//         }

//         // Calculate and call the progress callback
//         const percentComplete = (index / totalPorts) * 100
//         console.log({ index }, { totalPorts })
//         mainWindow?.webContents.send('scan-ports-progress', percentComplete)
//     }

//     console.log({ portsToScan })
//     console.log({ openPorts })
//     portsAreScanning = false
//     return openPorts
// }

// scanPorts(8000, 9000).then((openPorts) => {
// 	console.log('Open ports:', openPorts);
// });

const scanPortFactory = {
    create: function () {
        return new Promise((resolve, reject) => {
            resolve(scanPort)
        })
    },
    destroy: function (scanPort: any) {
        return new Promise((resolve) => {
            resolve(false)
        })
    },
}

const opts = { max: 5 } // Adjust these numbers based on your system's capabilities
const scanPortPool = genericPool.createPool(scanPortFactory, opts)

async function scanPorts(portsToScan) {
    const openPorts = []
    const totalPorts = portsToScan.length

    if (portsAreScanning) {
        console.log('Ports are already scanning!')
        throw new Error('Ports are already scanning!')
    }

    portsAreScanning = true
    shouldContinueScanning = true

    let index = 0
    for (const port of portsToScan) {
        index++
        if (!shouldContinueScanning) {
            console.log('Scanning stopped.')
            break
        }

        let scanPortInstance
        let retries = 0
        const maxRetries = 5 // Adjust this based on your needs

        while (!scanPortInstance && retries < maxRetries) {
            try {
                scanPortInstance = await scanPortPool.acquire()
            } catch (error) {
                console.log('All workers are busy. Retrying in 1 second...')
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second
                retries++
            }
        }

        if (!scanPortInstance) {
            console.log(
                `Failed to acquire a worker after ${maxRetries} retries. Skipping port ${port}.`
            )
            continue
        }

        const response = await scanPortInstance(port)
        scanPortPool.release(scanPortInstance)

        if (response) {
            openPorts.push({
                port,
                statusCode: response?.statusCode,
                statusMessage: response?.statusMessage,
                headers: response?.headers,
                error: response?.error,
            })
        }

        const percentComplete = (index / totalPorts) * 100
        console.log({ index }, { totalPorts })
        mainWindow?.webContents.send('scan-ports-progress', percentComplete)
    }

    console.log({ portsToScan })
    console.log({ openPorts })
    portsAreScanning = false
    return openPorts
}

// KILL PORT functionality
let isPortKilling = false

async function killPort(port: number) {
    try {
        // disallow running new kill-port process is one is already in progress
        if (isPortKilling) {
            throw new Error('Another kill-port process is already in progress.')
        }

        isPortKilling = true

        // disallow killing ports in specific range
        if (port < 1024) {
            throw new Error(
                'Well-known ports (0 - 1023) are not allowed to be killed.'
            )
        }

        return await kill(port)

        // eslint-disable-next-line no-useless-catch
    } catch (error) {
        throw error
    } finally {
        isPortKilling = false
    }
}

// GET LOCALHOST IP ADDRESS functionality
function getLocalhostAddress() {
    const networkInterfaces = os.networkInterfaces()
    const addresses: string[] = []

    // Loop through network interfaces to find the IPv4 addresses
    Object.keys(networkInterfaces).forEach((iface) => {
        networkInterfaces[iface].forEach((details) => {
            if (details.family === 'IPv4' && !details.internal) {
                addresses.push(details.address)
            }
        })
    })

    return addresses.join(', ')
}

// HANDLERS
ipcMain.handle('kill-port', (event, port: number) => {
    return killPort(port)
})

ipcMain.handle('scan-ports-progress', (event, percentComplete) => {
    return percentComplete
})

ipcMain.handle('stop-server', () => {
    if (server) {
        server.close(() => {
            console.log('Server stopped')
        })
        server = null
    }

    return 'Server stopped'
})

ipcMain.handle('scan-port', async () => {
    return await scanPort(11)
})

ipcMain.handle('scan-ports', async (event, portsArray) => {
    return await scanPorts(portsArray)
})

ipcMain.handle('stop-scanning', () => {
    shouldContinueScanning = false
    return 'Scanning will stop.'
})

ipcMain.handle('get-ip', () => {
    return getLocalhostAddress()
})
