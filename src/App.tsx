import React from 'react'
import ReactDOM from 'react-dom/client'

// Contexts
import { PortsForScanningProvider } from './context/PortsForScanningContext'
import { ScannedPortsProvider } from './context/ScannedPortsContext'
import { SelectedPortProvider } from './context/SelectedPortContext'

// Pages
import Home from './pages/Home'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SelectedPortProvider>
            <PortsForScanningProvider>
                <ScannedPortsProvider>
                    <Home />
                </ScannedPortsProvider>
            </PortsForScanningProvider>
        </SelectedPortProvider>
    </React.StrictMode>
)
