import range from 'lodash.range'
import sortedUniq from 'lodash.sorteduniq'

export const parsePortsForScanning = (state: (number | number[])[] | []) =>
    sortedUniq(
        []
            .concat(
                ...state.map((item) => {
                    if (
                        Array.isArray(item) &&
                        item.length === 2 &&
                        typeof item[0] === 'number' &&
                        typeof item[1] === 'number'
                    ) {
                        return range(item[0], item[1])
                    }
                    return item
                })
            )
            .sort((a, b) => a - b)
    )
