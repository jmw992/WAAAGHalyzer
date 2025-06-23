"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RecordedMatch } from "@/lib/useZustandStore";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

interface MatchesTableProps {
  matches: RecordedMatch[];
  onView?: (match: RecordedMatch) => void;
  onDelete?: (match: RecordedMatch) => void;
}

export function MatchesTable({ matches, onView, onDelete }: MatchesTableProps) {
  const columns: ColumnDef<RecordedMatch>[] = [
    {
      accessorKey: "index",
      header: "Index",
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
      accessorKey: "playerFaction",
      header: "Player Faction",
      cell: ({ getValue }) => <div>{getValue() as string}</div>,
    },
    {
      accessorKey: "opponentFaction",
      header: "Opponent Faction",
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
      id: "view",
      //   header: "View",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView?.(row.original)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "delete",
      //   header: "Delete",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(row.original)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
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
