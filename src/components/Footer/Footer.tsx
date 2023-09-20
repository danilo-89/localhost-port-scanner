import { useCallback, useEffect, useState } from 'react'
import { SvgArrowPath } from '@/components/icons'
import Button from '../common/Button'

const Footer = () => {
    const [ipAddress, setIpAddress] = useState(undefined)

    console.log(ipAddress)

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
        <footer className="fixed bottom-0 left-0 right-0 flex justify-between bg-[#2a2e3b] px-3 py-1 text-sm text-[#939aaf]">
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
