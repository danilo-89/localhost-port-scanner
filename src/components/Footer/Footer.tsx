import { useCallback, useEffect, useState } from 'react'

// Components
import { SvgArrowPath } from '@/components/icons'
import Button from '@/components/common/Button'

const Footer = () => {
    const [ipAddress, setIpAddress] = useState(undefined)

    const provideGetIP = useCallback(async () => {
        try {
            setIpAddress(await window.electronAPI.getIP())
        } catch (error) {
            setIpAddress(undefined)
        }
    }, [])

    useEffect(() => {
        provideGetIP()
    }, [provideGetIP])

    return (
        <footer className="bg-gunmetal text-santasGray fixed bottom-0 left-0 right-0 flex justify-between px-3 py-1 text-sm">
            <div>{ipAddress}</div>
            <Button
                variation="transparent"
                size="sm"
                onClick={provideGetIP}
            >
                <SvgArrowPath className="h-3 w-3" />
            </Button>
        </footer>
    )
}

export default Footer
