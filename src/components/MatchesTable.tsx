"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RecordedMatch } from "@/lib/types";

interface MatchesTableProps {
  matches: RecordedMatch[];
  onView?: (match: RecordedMatch) => void;
  onDelete?: (match: RecordedMatch) => void;
}

export function MatchesTable({ matches, onView, onDelete }: MatchesTableProps) {
  const columns: ColumnDef<RecordedMatch>[] = [
    {
      accessorKey: "recordingNumber",
      header: "",
      cell: ({ getValue }) => (
        <div className="font-medium">{getValue() as number}</div>
      ),
    },
    {
      accessorKey: "matchType",
      header: "Match Type",
      cell: ({ getValue }) => <div>{getValue() as string}</div>,
    },
    {
      accessorKey: "player1Faction",
      header: "Player1 Faction",
      cell: ({ getValue }) => <div>{getValue() as string}</div>,
    },
    {
      accessorKey: "player2Faction",
      header: "Player2 Faction",
      cell: ({ getValue }) => <div>{getValue() as string}</div>,
    },
    {
      accessorKey: "win",
      header: "Result",
      cell: ({ getValue }) => (
        <div
          className={`font-medium ${getValue() ? "text-green-600" : "text-red-600"}`}
        >
          {getValue() ? "Win" : "Loss"}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const match = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onView?.(match)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(match)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: matches,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
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
                No matches found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
