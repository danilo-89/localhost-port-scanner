import { useEffect, useMemo, useState } from 'react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	RankingInfo,
	rankItem,
	compareItems,
} from '@tanstack/match-sorter-utils';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

const data = [
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
];

const ScannedPorts = () => {
	const [sorting, setSorting] = useState<any>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const columns = useMemo<any>(
		() => [
			{
				accessorKey: 'port',
				header: 'Port',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'headers.content-type',
				header: 'Content Type',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'headers.x-powered-by',
				header: 'X-Powered-By',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
			{
				accessorKey: 'headers.connection',
				header: 'Connection',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		debugTable: true,
	});

	return (
		<div>
			<div>
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					className='p-2 font-lg shadow border border-block'
					placeholder='Search all columns...'
				/>
			</div>{' '}
			<div>
				<div className='h-2' />
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
											className='text-left pr-5'
										>
											{header.isPlaceholder ? null : (
												<div
													{...{
														className: header.column.getCanSort()
															? 'cursor-pointer select-none'
															: '',
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: ' 🔼',
														desc: ' 🔽',
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table
							.getRowModel()
							.rows.slice(0, 10)
							.map((row) => {
								return (
									<tr key={row.id}>
										{/* <td>
											<input type='checkbox' name='' id='' />
										</td> */}
										{row.getVisibleCells().map((cell) => {
											return (
												<td
													key={cell.id}
													className='pr-5'
													onClick={() => console.log(row)}
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
					</tbody>
				</table>
				<hr />
				{/* <div>{table.getRowModel().rows.length} Rows</div> */}
				{/* <div>
    <button onClick={() => rerender()}>Force Rerender</button>
  </div>
  <div>
    <button onClick={() => refreshData()}>Refresh Data</button>
  </div> */}
				<hr />
				<pre>{JSON.stringify(sorting, null, 2)}</pre>
			</div>
		</div>
	);
};

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

export default ScannedPorts;