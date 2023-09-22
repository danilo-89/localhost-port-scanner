import clsx from 'clsx'

// Configs
import { scannedPortInfoConfig } from './scannedPortInfoConfig'

// Utilities
import { getStatusMessageInfo } from '@/utils/getStatusMessageInfo'
import { getPortRangeMessage } from '@/utils/getPortRangeMessage'
import { PORT_RANGE_MESSAGES_SOURCE } from '@/constants/portRangeMessages'

// TS
interface IProps {
    clickedRowInfo: any
}

const ScannedPortInfo = ({ clickedRowInfo }: IProps) => {
    return (
        <div className="mx-auto w-[35rem] bg-yankeesBlue">
            <div className="mb-4 bg-darkGunmetal p-4">
                <h2 className="mb-2 text-lg font-bold">
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
                        className="mt-1 text-sm text-[#619ad6] underline"
                    >
                        list of TCP and UDP port numbers
                    </a>{' '}
                    ]
                </div>
                <div></div>
            </div>
            <div className="p-5">
                {/* <span className="mb-8 block border-b border-b-charcoal pt-2" /> */}
                <ul className="flex flex-col">
                    {scannedPortInfoConfig.map((item) => {
                        const itemValue = clickedRowInfo[item.key]
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

                                {item.key === 'statusMessage' && (
                                    <div className="mt-2 block rounded-md bg-darkGunmetal/10 p-4 text-sm outline outline-charcoal">
                                        {getStatusMessageInfo(itemValue)}
                                        {itemValue !== 'OK' && (
                                            <div className="mt-3 text-[#619ad6]">
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
