"use client"

import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import * as React from "react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";

const data: Payment[] = [
    {
        id: "m5gr84i9",
        tags: ["quiz", "midterm", "endterm", "video"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "John Doe",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "3u1reuv4",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "Sahil Mangla",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "derv1ws0",
        tags: ["quiz", "midterm", "system"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "Monserrat44@gmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "5kma53ae",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "Silas22@gmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
    {
        id: "bhqecj4p",
        tags: ["quiz", "midterm"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: 2022,
        semester: 2,
        author: "carmella@hotmail.com",
        batch: "2025",
        link: "www.google.com",
    },
]

export type Payment = {
    id: string
    tags: string[]
    description: string
    year: number
    semester: number
    author: string
    batch: string
    link: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        enableHiding: false,
        accessorKey: "vote",
        header: "",
        cell: () => (
            <div className="space-y-2">
                <Button variant="secondary" className="w-15 h-8">
                    <IoMdArrowRoundUp size={20} />
                </Button>
                <Button variant="secondary" className="w-15 h-8">
                    <IoMdArrowRoundDown size={20} />
                </Button>

            </div>
        ),
    },
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (
                <div className="my-2">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Author
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue("author")},
                <br />
                batch of {row.getValue("batch")}
            </div>
        ),

    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div>
                <div className="capitalize my-1 text-muted-foreground">{row.getValue("description")} </div>
                <Button variant="outline" className="h-8 w-18">View</Button>
            </div>
        ),
    },
    {
        accessorKey: "tags",
        header: () => <div className="text-right">Tags</div>,
        cell: ({ row }) => {
            const tags = row.getValue("tags");
            const rows = [];
            for (let i = 0; i < tags.length; i += 2) {
                rows.push(
                    <div className="text-right font-medium flex space-x-1">
                        {i % 4 === 0 ? (
                            <>
                                <Badge variant="default" className="my-0.5">#{tags[i]}</Badge>
                                {i + 1 < tags.length && <Badge variant="secondary" className="my-0.5">#{tags[i + 1]}</Badge>}
                            </>
                        ) : (
                            <>
                                <Badge variant="secondary" className="my-0.5">#{tags[i]}</Badge>
                                {i + 1 < tags.length && <Badge variant="default" className="my-0.5">#{tags[i + 1]}</Badge>}
                            </>
                        )}
                    </div>
                );
            }
            return rows;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.link)}
                        >
                            Copy drive link
                        </DropdownMenuItem>
                        <DropdownMenuItem>Bookmark</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function CourseResultsTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageData, setPageData] = useState([]);

    useEffect(() => {
        const getPageData = () => {
            const startIndex = pageIndex * pageSize;
            const endIndex = startIndex + pageSize;
            return data.slice(startIndex, endIndex);
        };

        setPageData(getPageData());
    }, [pageIndex, pageSize]);

    const table = useReactTable({
        data: pageData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter authors..."
                    value={(table.getColumn("author")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("author")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
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
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
                </div>

                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
                        disabled={pageIndex === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPageIndex(pageIndex + 1)}
                        disabled={pageData.length < pageSize}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
