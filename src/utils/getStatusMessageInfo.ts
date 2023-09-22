import { portStatusMessages } from '@/constants/portStatusMessages'

export const getStatusMessageInfo = (statusMessage: string | undefined) => {
    switch (statusMessage) {
        case 'OK':
            return portStatusMessages.OK
        case 'NOT FOUND':
            return portStatusMessages.NOT_FOUND
        case 'UNSAFE PORT':
            return portStatusMessages.UNSAFE_PORT
        case 'ADDRESS INVALID':
            return portStatusMessages.ADDRESS_INVALID
        case 'Invalid URL':
            return portStatusMessages.INVALID_URL
        default:
            return portStatusMessages.UNDEFINED
    }
}
