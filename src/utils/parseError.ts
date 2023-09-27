export const parseError = (errorValue: string | undefined) => {
    if (errorValue.startsWith('net::ERR_')) {
        return errorValue.slice(9).replaceAll('_', ' ')
    }

    return errorValue
}
