import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react'
import {
    ColumnDef,
    FilterFn,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    PaginationState,
    isRowSelected,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table'
import {
    RankingInfo,
    rankItem,
    compareItems,
} from '@tanstack/match-sorter-utils'
import { usePortsForScanningContext } from '@/context/PortsForScanningContext'
import { useScannedPortsContext } from '@/context/ScannedPortsContext'
// import * as Checkbox from '@radix-ui/react-checkbox';
import detectiveImg from '@/assets/detective.png'
import detectiveReadyImg from '@/assets/detective-ready.png'
import LoaderDots from '../LoaderDots'
import Button from '../common/Button'
import SvgInfoCircle from '../icons/SvgInfoCircle'
import Modal from '../common/Modal'
import ScannedPortInfo from '../ScannedPortInfo'
import { useSelectedPortContext } from '@/context/SelectedPortContext'
import SvgChevronDoubleLeft from '../icons/SvgChevronDoubleLeft'
import SvgChevronLeft from '../icons/SvgChevronLeft'
import { SvgCog8Solid } from '../icons'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const emptyArray: [] = []

const dataMockup = [
    {
        port: 3000,
        statusCode: 200,
        statusMessage: 'OK',
        headers: {
            'cache-control': 'no-store, must-revalidate',
            connection: 'keep-alive',
            'content-encoding': 'gzip',
            'content-type': 'text/html; charset=utf-8',
            date: 'Sun, 17 Sep 2023 19:25:28 GMT',
            'keep-alive': 'timeout=5',
            'transfer-encoding': 'chunked',
            vary: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding',
            'x-powered-by': 'Next.js',
        },
    },
    {
        port: 5173,
        statusCode: 404,
        statusMessage: 'Not Found',
        headers: {
            'access-control-allow-origin': '*',
            connection: 'keep-alive',
            'content-length': '0',
            date: 'Sun, 17 Sep 2023 19:25:29 GMT',
            'keep-alive': 'timeout=5',
        },
    },
]

type Port = {
    port: number
    statusMessage: string
    headers: {
        'content-type': string
        'x-powered-by': string
        connection: string
    }
}

const columnHelper = createColumnHelper<Port>()

const ScannedPorts = () => {
    const { state } = useScannedPortsContext()
    const { portsForScanning } = usePortsForScanningContext()
    const [sorting, setSorting] = useState<any>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [rowSelection, setRowSelection] = useState({})
    const [clickedRowInfo, setClickedRowInfo] = useState(null)
    const { setSelectedPort } = useSelectedPortContext()

    const setModalState = (openState: boolean) => {
        if (openState === false) {
            setClickedRowInfo(null)
        } else {
            return
        }
    }

    console.log('state', state.data)

    // ensure row is deselected on every scan
    useEffect(() => {
        setRowSelection({})
    }, [state.isLoading])

    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'info',
                cell: ({ row }) => (
                    <div className="pl-4">
                        <Button
                            className="py-2"
                            type="button"
                            size="sm"
                            variation="transparent"
                            hasBorder={false}
                            onClick={(e) => {
                                e.stopPropagation(),
                                    setClickedRowInfo(row.original)
                            }}
                        >
                            <SvgInfoCircle />
                        </Button>
                    </div>
                ),
            }),
            columnHelper.accessor('port', {
                header: 'Port',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            columnHelper.accessor('statusMessage', {
                header: 'Status',
                cell: (info) => (
                    <span className="lowercase">{info.getValue()}</span>
                ),
                footer: (props) => props.column.id,
            }),
            columnHelper.accessor('headers.content-type', {
                header: 'Content Type',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            columnHelper.accessor('headers.x-powered-by', {
                header: 'X-Powered-By',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            columnHelper.accessor('headers.connection', {
                header: 'Connection',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
        ],
        []
    )

    const table = useReactTable({
        // initialState: [],
        data: state.data || emptyArray,
        // data: state?.data || [],
        columns,
        state: {
            sorting,
            globalFilter,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 50,
                pageIndex: 0,
            },
        },
        enableRowSelection: true,
        enableMultiRowSelection: false,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    })

    useEffect(() => {
        setSelectedPort(table.getSelectedRowModel().rows?.[0]?.original || null)
        console.log('test')
    }, [table, rowSelection, setSelectedPort])

    if (state.isLoading)
        return (
            <div
                key="detective-searching"
                className="flex h-[calc(100vh-19em)] max-h-[32rem] min-h-[22rem]"
            >
                <figure className="relative m-auto text-center text-manatee">
                    <img
                        className="m-auto mb-2 w-[29rem]"
                        src={detectiveImg}
                        alt="detective with magnifying glass illustration"
                        width={464}
                        height={'auto'}
                    />
                    <figcaption className="speech-bubble absolute right-[6.2rem] top-[-1rem] translate-x-full rounded-lg px-6 py-3 font-semibold text-manatee">
                        Scanning, please wait
                        <LoaderDots />
                    </figcaption>
                </figure>
            </div>
        )

    if (!state.data?.length && state.percentOfScanning === undefined) {
        return (
            <div
                key="detective-ready"
                className="flex h-[calc(100vh-19em)] max-h-[32rem] min-h-[22rem]"
            >
                <figure className="relative m-auto text-center text-manatee">
                    <img
                        className="m-auto mb-2 w-[22rem]"
                        src={detectiveReadyImg}
                        alt="detective with magnifying glass illustration"
                        width={352}
                        height={'auto'}
                    />
                    <figcaption className="speech-bubble absolute right-[1.5rem] top-[-1rem] translate-x-full rounded-lg px-6 py-3 font-semibold text-manatee">
                        {portsForScanning?.length ? (
                            <>
                                Modify selected ports{' '}
                                <SvgCog8Solid className="inline-block h-6 w-6 pb-[0.1rem] text-lotion" />
                                <br />
                                or just hit SCAN to begin now.
                            </>
                        ) : (
                            <>
                                Pick the ports{' '}
                                <SvgCog8Solid className="inline-block h-6 w-6 pb-[0.1rem] text-lotion" />
                                ,
                                <br />
                                then just hit SCAN to begin.
                            </>
                        )}
                    </figcaption>
                </figure>
            </div>
        )
    }

    return (
        <div>
            {clickedRowInfo ? (
                <Modal
                    setIsOpen={(openState: boolean) => setModalState(openState)}
                >
                    <ScannedPortInfo clickedRowInfo={clickedRowInfo} />
                </Modal>
            ) : null}
            <div className="styled-scrollbar h-[calc(100vh-19em)] min-h-[22rem] overflow-auto">
                <table className="min-w-full">
                    <thead className="sticky top-0">
                        <tr className="sticky top-0 bg-yankeesBlue">
                            <th
                                colSpan={10}
                                className="sticky top-0"
                            >
                                <div className="flex bg-yankeesBlue p-2">
                                    <DebouncedInput
                                        value={globalFilter ?? ''}
                                        onChange={(value) =>
                                            setGlobalFilter(String(value))
                                        }
                                        className="mr-auto px-2 py-1 text-sm font-normal"
                                        placeholder="Search all columns..."
                                        type="search"
                                    />
                                    {/* <div className="mx-auto">
                                        <label htmlFor="includeClosed">
                                            <input
                                                type="checkbox"
                                                name=""
                                                id="includeClosed"
                                            />
                                            show closed ports
                                        </label>
                                    </div> */}
                                    <div className="flex items-center gap-2">
                                        <div className="mr-5 flex gap-2">
                                            <Button
                                                onClick={() =>
                                                    table.setPageIndex(0)
                                                }
                                                disabled={
                                                    !table.getCanPreviousPage()
                                                }
                                                variation="transparent"
                                                size="sm"
                                                className="h-9 w-9 py-2"
                                            >
                                                <SvgChevronDoubleLeft />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    table.previousPage()
                                                }
                                                disabled={
                                                    !table.getCanPreviousPage()
                                                }
                                                variation="transparent"
                                                size="sm"
                                                className="h-9 w-9 py-2"
                                            >
                                                <SvgChevronLeft />
                                            </Button>
                                            <span className="flex items-center gap-1 font-medium">
                                                <input
                                                    type="number"
                                                    value={
                                                        table.getState()
                                                            .pagination
                                                            .pageIndex + 1
                                                    }
                                                    onChange={(e) => {
                                                        const pageCount =
                                                            table.getPageCount()
                                                        const page = e.target
                                                            .value
                                                            ? Number(
                                                                  e.target.value
                                                              ) - 1
                                                            : 0
                                                        table.setPageIndex(
                                                            page >= pageCount
                                                                ? pageCount - 1
                                                                : page
                                                        )
                                                    }}
                                                    className="h-9 w-16 rounded border p-1"
                                                />
                                                <span>
                                                    of {table.getPageCount()}
                                                </span>
                                            </span>

                                            <Button
                                                onClick={() => table.nextPage()}
                                                disabled={
                                                    !table.getCanNextPage()
                                                }
                                                variation="transparent"
                                                size="sm"
                                                className="h-9 w-9 py-2"
                                            >
                                                <SvgChevronLeft flip={true} />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    table.setPageIndex(
                                                        table.getPageCount() - 1
                                                    )
                                                }
                                                disabled={
                                                    !table.getCanNextPage()
                                                }
                                                variation="transparent"
                                                size="sm"
                                                className="h-9 w-9 py-2"
                                            >
                                                <SvgChevronDoubleLeft
                                                    flip={true}
                                                />
                                            </Button>
                                        </div>

                                        <select
                                            className="h-9 px-2 py-1"
                                            value={
                                                table.getState().pagination
                                                    .pageSize
                                            }
                                            onChange={(e) => {
                                                table.setPageSize(
                                                    Number(e.target.value)
                                                )
                                            }}
                                        >
                                            {[10, 20, 30, 40, 50, 100].map(
                                                (pageSize) => (
                                                    <option
                                                        key={pageSize}
                                                        value={pageSize}
                                                    >
                                                        Show {pageSize}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr
                                key={headerGroup.id}
                                className="bg-yankeesBlue"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                            className="[&:not(:first-of-type):not(:nth-of-type(2)]:w-[10rem] max-w-[14rem] truncate pr-5 text-left text-manatee [&:nth-of-type(2)]:w-[8rem] [&:nth-of-type(2)]:max-w-[8rem] [&:nth-of-type(2)]:py-4"
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table
                            .getRowModel()
                            .rows // .slice(0, 10)
                            .map((row) => {
                                return (
                                    <tr
                                        key={row.id}
                                        className={
                                            row.getIsSelected()
                                                ? 'bg-[#521687]'
                                                : 'odd:bg-charcoal even:bg-yankeesBlue'
                                        }
                                        onClick={() => {
                                            // Toggle the row selection when the row is clicked
                                            if (row.getCanSelect()) {
                                                row.toggleSelected()
                                            }
                                        }}
                                        // onClick={() => setSelectedRow(row)}
                                        // className='border-y-[1rem] border-[transparent]'
                                    >
                                        {/* <td>
											<input type='checkbox' name='' id='' />
										</td> */}
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={`[&:not(:first-of-type):not(:nth-of-type(2)]:w-[10rem] max-w-[14rem] truncate pr-5 [&:empty::after]:text-[#9DA3AE] [&:empty::after]:content-['-'] [&:nth-of-type(2)]:w-[8rem] [&:nth-of-type(2)]:max-w-[8rem] [&:nth-of-type(2)]:py-4 `}
                                                    onClick={() =>
                                                        console.log(row)
                                                    }
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                {/* <hr />
                <div>{table.getRowModel().rows.length} Rows</div> */}
                {/* <div>
    <button onClick={() => rerender()}>Force Rerender</button>
  </div>
  <div>
    <button onClick={() => refreshData()}>Refresh Data</button>
  </div> */}
                {/* <hr />

                <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
            </div>
        </div>
    )
}

// A debounced input react component
function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = useRef<HTMLInputElement>(null!)

    useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
    }, [ref, indeterminate])

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    )
}

export default ScannedPorts
