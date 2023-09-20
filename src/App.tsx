import React from 'react'
import ReactDOM from 'react-dom/client'

// Contexts
import { PortsForScanningProvider } from './context/PortsForScanningContext'
import { ScannedPortsProvider } from './context/ScannedPortsContext'

// Pages
import Home from './pages/Home'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <PortsForScanningProvider>
            <ScannedPortsProvider>
                <Home />
            </ScannedPortsProvider>
        </PortsForScanningProvider>
    </React.StrictMode>
)
