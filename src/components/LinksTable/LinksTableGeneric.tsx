import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Link } from "@/lib/types";

interface LinksTableProps {
  links: Link[];
  deleteLink: (index: number) => void;
  updateLink: (index: number, link: { title: string; url: string }) => void;
}

export function LinksTableGeneric({
  links,
  deleteLink,
  updateLink,
}: LinksTableProps) {
  const columns = useMemo<ColumnDef<(typeof links)[0]>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <Input
            type="text"
            value={row.original.title}
            onChange={(e) => {
              updateLink(row.index, {
                ...row.original,
                title: e.target.value,
              });
            }}
          />
        ),
      },
      {
        accessorKey: "url",
        header: "Link",
        cell: ({ row }) => (
          <Input
            type="text"
            value={row.original.url}
            onChange={(e) => {
              updateLink(row.index, {
                ...row.original,
                url: e.target.value,
              });
            }}
          />
        ),
      },
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          <button
            type="button"
            className="p-1 hover:text-destructive"
            title="Delete"
            onClick={() => {
              deleteLink(row.index);
            }}
          >
            <Trash2 size={18} />
          </button>
        ),
      },
    ],
    [updateLink, deleteLink],
  );

  const table = useReactTable({
    data: links,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border mt-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No Links
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
