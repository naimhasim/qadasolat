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
import { DownloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: PaginationState
    setPagination: OnChangeFn<PaginationState> | undefined
    isDownload: boolean
    setDownload: React.Dispatch<React.SetStateAction<boolean>>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    setPagination,
    isDownload,
    setDownload,
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

    const onSetDownload = () => {
        setDownload(!isDownload);
    };
    

    const handleDownload = async (URL: string | null) => {
        if(!URL) return;
        try {
            // Replace 'example.pdf' with the path to your file
            const response = await fetch(URL);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'example.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        setDownload(false);
    };
    
    return (
        <>
            <div className="flex justify-center items-center mb-1">
                {/* <small>Export</small> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline-block h-4 w-4 transform shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"></path></svg> */}
                <>
                    {/* <PDFViewer width={'100%'} height={'500'}>
                        <Invoice invoiceData={data}/>
                    </PDFViewer> */}
                    
                    {/* <div className="hover:underline"> */}
                    
                    <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r4p:" data-state="closed" disabled={ isDownload ? true : false }
                        onClick={onSetDownload}>
                        
                        {!isDownload ? (
                            <>
                                <DownloadIcon className="w-4 h-4 mr-2" />
                                Download
                            </>
                        ) : (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                                
                                <PDFDownloadLink document={<Invoice invoiceData={data} />} fileName="qada">
                                    {({ blob, url, loading, error }) => {

                                        if(!loading){
                                            handleDownload(url) 
                                        }
                                        
                                        return (<></>);
                                    }
                                    }
                                </PDFDownloadLink>
                            </>
                        )}
                    </button>

                    {/* </div> */}
                </>
                </div>
        <div className="rounded-sm border border-muted w-full overflow-auto">
            
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="" key={headerGroup.id}>
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
                            <TableRow className=""
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