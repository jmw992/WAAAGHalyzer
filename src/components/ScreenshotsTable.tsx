import * as React from "react";
import { useZustandStore } from "@/lib/useZustandStore";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

export function ScreenshotsTable() {
  const screenshots = useZustandStore((s) => s.screenshots);

  // Optionally, add handlers for view/delete actions
  const handleView = (file: string) => {
    // Implement your view logic here
    window.open(file, "_blank");
  };

  const handleDelete = (file: string) => {
    // Implement your delete logic here
    // e.g., remove from Zustand store
    // You may want to add a removeScreenshot action to your store
    alert(`Delete ${file}`);
  };

  const columns = React.useMemo<ColumnDef<(typeof screenshots)[0]>[]>(
    () => [
      {
        accessorKey: "file",
        header: "File",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        id: "view",
        header: "",
        cell: ({ row }) => (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            className="p-1 hover:text-primary"
            title="View"
            onClick={() => handleView(row.original.file)}
          >
            <Eye size={18} />
          </button>
        ),
      },
      {
        id: "delete",
        header: "",
        cell: ({ row }) => (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            className="p-1 hover:text-destructive"
            title="Delete"
            onClick={() => handleDelete(row.original.file)}
          >
            <Trash2 size={18} />
          </button>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: screenshots,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
              No screenshots found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
