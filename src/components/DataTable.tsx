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
import { CloudDownloadIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pagination: PaginationState
    setPagination: OnChangeFn<PaginationState> | undefined
    isDownload: boolean
    setDownload: React.Dispatch<React.SetStateAction<boolean>>
    daysDifference: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pagination,
    setPagination,
    isDownload,
    setDownload,
    daysDifference
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
            <div className="flex justify-center items-center gap-2 mb-1">
                {/* <small>Export</small> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" inline-block h-4 w-4 transform shrink-0 transition-transform duration-200"><path d="m6 9 6 6 6-6"></path></svg> */}

                    {/* <PDFViewer width={'100%'} height={'500'}>
                        <Invoice invoiceData={data}/>
                    </PDFViewer> */}
                    
                    <div className="flex gap-1">
                        {daysDifference < 3650 && <Button variant={"shadcn"} size={'shadcn'} 
                                disabled={ isDownload ? true : false } 
                                onClick={onSetDownload}>
                            
                            {!isDownload ? (
                                <>
                                    <DownloadIcon className="w-4 h-4 mr-2" />
                                    Export
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
                        </Button>}
                        {/* <Button variant={"shadcn"} size={'shadcn'} >
                            <CloudDownloadIcon className="w-4 h-4 mr-2"/>
                            Save Progress
                        </Button> */}
                    </div>

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