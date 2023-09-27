import { portRangeMessages } from '@/constants/portRangeMessages'

export const getPortRangeMessage = (portNumber: number) => {
    if (portNumber < 1024) {
        return portRangeMessages.WELL_KNOWN_PORTS
    } else if (portNumber < 49152) {
        return portRangeMessages.REGISTERED_PORTS
    } else if (portNumber < 65536) {
        return portRangeMessages.PRIVATE_PORTS
    }

    return ''
}
