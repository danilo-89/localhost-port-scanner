import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'

import range from 'lodash.range'
import { useEffect, useReducer, useState } from 'react'
import Button from '../common/Button'

// sortedUniqBy

const Settings = () => {
    // const [state, dispatch] = useReducer(reducer, [[3000, 9001], 2000]);
    const { state, dispatch } = usePortsForScanningContext()
    const [inputLeft, setInputLeft] = useState(undefined)
    const [inputRight, setInputRight] = useState(undefined)
    const [inputSingle, setInputSingle] = useState(undefined)
    const [showRange, setShowRange] = useState(false)
    // const [percent, setPercent] = useState(0);
    const { state: scanningResult, scanPorts } = useScannedPortsContext()

    console.log(state)

    const addToState = () => {
        if (showRange) {
            dispatch([inputLeft, inputRight])
        } else {
            dispatch(inputSingle)
        }
    }

    // const scanPorts = async () => {
    // 	try {
    // 		const response = await window.electronAPI.scanPorts(state);
    // 		console.log(response);
    // 	} catch (error: unknown) {
    // 		console.log(error);
    // 	}
    // };

    // console.log({ scanningResult });
    console.log({ CHECK: state })

    return (
        <div className="w-[30rem] bg-yankeesBlue p-5">
            <div className="mb-8">
                <h2 className="text-lg font-bold">Settings</h2>{' '}
            </div>
            <div className="flex h-[7rem] flex-wrap content-start justify-start gap-1 overflow-auto rounded-lg bg-charcoal p-3">
                {state.map((item: number | number[]) => {
                    const itemValue = Array.isArray(item)
                        ? item.join(' - ')
                        : item

                    return (
                        <span
                            className="inline-block rounded-full bg-darkGunmetal px-2 py-1 text-sm"
                            key={itemValue}
                        >
                            {itemValue}{' '}
                            <Button
                                type="button"
                                variation="neutral"
                                size="sm"
                                className="rounded-full"
                            >
                                x
                            </Button>
                        </span>
                    )
                })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    addToState()
                }}
            >
                {showRange ? (
                    <div className="flex">
                        <input
                            key="inputLeft"
                            value={inputLeft}
                            onChange={(e) => setInputLeft(+e.target.value)}
                            className="w-[40%] border"
                            type="number"
                            name=""
                            id=""
                        />{' '}
                        -{' '}
                        <input
                            key="inputRight"
                            value={inputRight}
                            onChange={(e) => setInputRight(+e.target.value)}
                            className="w-[40%] border"
                            type="number"
                            name=""
                            id=""
                        />
                    </div>
                ) : (
                    <div>
                        <input
                            key="inputSingle"
                            value={inputSingle}
                            onChange={(e) => setInputSingle(+e.target.value)}
                            className="border"
                            type="number"
                            name=""
                            id=""
                        />
                    </div>
                )}
                <label htmlFor="rangeCheckbox">range</label>
                <input
                    type="checkbox"
                    name="range"
                    id="rangeCheckbox"
                    checked={showRange}
                    onChange={() => setShowRange((curr) => !curr)}
                />
                <br />
                <Button
                    type="submit"
                    variation="tertiary"
                    size="md"
                >
                    Add Ports
                </Button>
            </form>

            <br />
        </div>
    )
}

export default Settings
