import clsx from 'clsx'

// Constants
import { PORT_RANGE_MESSAGES_SOURCE } from '@/constants/portRangeMessages'

// Configs
import { scannedPortInfoConfig } from './scannedPortInfoConfig'

// Utilities
import { getStatusMessageInfo } from '@/utils/getStatusMessageInfo'
import { getPortRangeMessage } from '@/utils/getPortRangeMessage'

// Types
import { ScanPortResponse } from '@/types/types'

// TS
interface IProps {
    clickedRowInfo: ScanPortResponse
}

const ScannedPortInfo = ({ clickedRowInfo }: IProps) => {
    return (
        <div className="mx-auto w-[35rem] bg-yankeesBlue">
            <div className="mb-4 bg-darkGunmetal p-4">
                <h2 className="mb-3 text-lg font-bold">
                    <span className="rounded-md bg-charcoal px-2">
                        {clickedRowInfo.port}
                    </span>{' '}
                    Port Info
                </h2>
                <div className="text-sm text-manatee">
                    {getPortRangeMessage(clickedRowInfo.port)} [{' '}
                    <a
                        href={PORT_RANGE_MESSAGES_SOURCE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blueGray mt-1 text-sm underline"
                    >
                        list of TCP and UDP port numbers
                    </a>{' '}
                    ]
                </div>
                <div></div>
            </div>
            <div className="p-5">
                <ul className="flex flex-col">
                    {scannedPortInfoConfig.map((item) => {
                        const itemValue =
                            clickedRowInfo[
                                item.key as keyof typeof clickedRowInfo
                            ]
                        const parsedContent = JSON.stringify(itemValue, null, 4)

                        if (itemValue === undefined) return null

                        return (
                            <li
                                key={item.key}
                                className="mb-4"
                            >
                                <span
                                    className={clsx(
                                        'font-bold text-manatee',
                                        parsedContent === '{}' &&
                                            'hidden [&+pre]:hidden'
                                    )}
                                >
                                    {item.label}:{' '}
                                </span>
                                {item.elementType === 'code' ? (
                                    <code className="rounded-md bg-charcoal px-2">
                                        {parsedContent}
                                    </code>
                                ) : (
                                    <pre className="styled-scrollbar mt-1 overflow-auto rounded-md bg-charcoal p-2 text-sm">
                                        {parsedContent}
                                    </pre>
                                )}
                                ∂
                                {item.key === 'statusMessage' && (
                                    <div className="mt-2 block rounded-md bg-darkGunmetal/10 p-4 text-sm outline outline-charcoal">
                                        {getStatusMessageInfo(
                                            itemValue as string
                                        )}
                                        {itemValue !== 'OK' && (
                                            <div className="text-blueGray mt-3">
                                                <a
                                                    href="https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline"
                                                >
                                                    Read more about network
                                                    errors
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ScannedPortInfo
