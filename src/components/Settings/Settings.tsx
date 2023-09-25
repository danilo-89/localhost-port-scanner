import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'

import range from 'lodash.range'
import { useEffect, useReducer, useState } from 'react'
import Button from '../common/Button'

const Settings = () => {
    // const [state, dispatch] = useReducer(reducer, [[3000, 9001], 2000]);
    const { state, dispatch } = usePortsForScanningContext()
    const [inputLeft, setInputLeft] = useState<'' | number>('')
    const [inputRight, setInputRight] = useState<'' | number>('')
    const [inputSingle, setInputSingle] = useState<'' | number>('')
    const [showRange, setShowRange] = useState(false)
    // const [percent, setPercent] = useState(0);
    const { state: scanningResult, scanPorts } = useScannedPortsContext()

    console.log(state)

    const addToState = () => {
        if (
            showRange &&
            typeof inputLeft === 'number' &&
            typeof inputRight === 'number'
        ) {
            dispatch({ name: 'add', payload: [inputLeft, inputRight] })
        }
        if (!showRange && typeof inputSingle === 'number') {
            dispatch({ name: 'add', payload: inputSingle })
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
        <div className="w-[30rem] bg-yankeesBlue">
            <div className="mb-4 bg-darkGunmetal p-4">
                <h2 className="text-lg font-bold">Settings</h2>
            </div>
            <div className="p-5">
                <span>Current ports for scanning:</span>
                <div className="styled-scrollbar mb-4 flex h-[7.5rem] flex-wrap content-start justify-start gap-1 overflow-auto rounded-lg bg-charcoal p-2">
                    {state.map((item: number | [number, number], idx) => {
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
                                    onClick={() =>
                                        dispatch({
                                            name: 'remove',
                                            payload: idx,
                                        })
                                    }
                                >
                                    x
                                </Button>
                            </span>
                        )
                    })}
                </div>

                <span>Add ports for scanning:</span>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        addToState()
                    }}
                    className="rounded-lg border-2 border-charcoal p-4 "
                >
                    <div className="mb-4 flex items-center">
                        {showRange ? (
                            <div className="flex items-center">
                                <input
                                    key="inputLeft"
                                    step={1}
                                    min={0}
                                    max={65_535}
                                    value={inputLeft}
                                    onChange={(e) =>
                                        setInputLeft(+e.target.value)
                                    }
                                    className="border py-1.5 pl-4 pr-1"
                                    type="number"
                                    name="inputLeft"
                                    id="inputLeft"
                                />
                                <span className="mx-3 inline-block">-</span>
                                <input
                                    key="inputRight"
                                    step={1}
                                    min={0}
                                    max={65_535}
                                    value={inputRight}
                                    onChange={(e) =>
                                        setInputRight(+e.target.value)
                                    }
                                    className="border py-1.5 pl-4 pr-1"
                                    type="number"
                                    name="inputRight"
                                    id="inputRight"
                                />
                            </div>
                        ) : (
                            <div>
                                <input
                                    key="inputSingle"
                                    step={1}
                                    min={0}
                                    max={65_535}
                                    value={inputSingle}
                                    onChange={(e) =>
                                        setInputSingle(+e.target.value)
                                    }
                                    className="border py-1.5 pl-4 pr-1"
                                    type="number"
                                    name="inputSingle"
                                    id="inputSingle"
                                    placeholder="port number"
                                />
                            </div>
                        )}
                        <div className="mb-2 ml-auto flex items-center">
                            {' '}
                            <input
                                type="checkbox"
                                name="range"
                                id="rangeCheckbox"
                                checked={showRange}
                                onChange={() => setShowRange((curr) => !curr)}
                                className="mr-1"
                            />
                            <label htmlFor="rangeCheckbox">range</label>
                        </div>
                    </div>

                    <div className="text-center">
                        {' '}
                        <Button
                            type="submit"
                            variation="tertiary"
                            size="md"
                            disabled={
                                (showRange &&
                                    (typeof inputLeft !== 'number' ||
                                        typeof inputRight !== 'number')) ||
                                (!showRange && typeof inputSingle !== 'number')
                            }
                        >
                            Add Ports
                        </Button>
                    </div>
                </form>
                <br />
            </div>
        </div>
    )
}

export default Settings
