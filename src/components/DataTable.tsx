// "use client"

import {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {PDFViewer, PDFDownloadLink} from "@react-pdf/renderer";
import { DataTablePagination } from "./DatatablePagination";
import Invoice from "./pdf/Invoice";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: PaginationState
    setPagination: OnChangeFn<PaginationState> | undefined
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    setPagination,
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel:  getFilteredRowModel(),
        getPaginationRowModel:  getPaginationRowModel(),
        onPaginationChange: setPagination,
        autoResetPageIndex: false,
        state: {
            pagination
        }
    })

    return (
        <>
            <div className="flex justify-center item">
                {/* <small>Export</small> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline-block h-4 w-4 transform shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"></path></svg> */}
                <>
                    {/* <PDFViewer width={'100%'} height={'500'}>
                        <Invoice invoiceData={data}/>
                    </PDFViewer> */}
                    
                    {/* <div className="hover:underline"> */}
                    <Button className="text-muted-secondary text-sm" variant="link">
                        <PDFDownloadLink document={<Invoice invoiceData={data}/>} fileName="qadasolat">
                            Download
                        </PDFDownloadLink>
                        </Button>
                    {/* </div> */}
                </>
                </div>
        <div className="rounded-sm border border-muted w-full overflow-auto">
            
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="border border-muted" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow className="border border-muted"
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
            <DataTablePagination table={table}/>
        </>
    )
}