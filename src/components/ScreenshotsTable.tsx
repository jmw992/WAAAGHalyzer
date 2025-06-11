import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteSreenshotFile,
  getScreenshotSrc,
} from "@/lib/screenshotFileHandling";
import { useZustandStore } from "@/lib/useZustandStore";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useMemo } from "react";

export function ScreenshotsTable() {
  const screenshots = useZustandStore((s) => s.screenshots);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);
  const deleteScreenshot = useZustandStore((s) => s.deleteScreenshot);

  // Optionally, add handlers for view/delete actions
  const handleView = (file: string) => {
    // Implement your view logic here
    getScreenshotSrc({
      screenshotFile: file,
      subDir: recordingUlid ?? "",
    })
      .then((src) => {
        console.log("jmw TODO src", src);
      })
      .catch((err: unknown) => {
        console.error("jmw getScreenshotSrc", err);
      });
    // window.open(file, "_blank");
  };

  const handleDelete = (file: string) => {
    deleteSreenshotFile({
      screenshotFile: file,
      subDir: recordingUlid ?? "",
    })
      .then(() => {
        deleteScreenshot(file);
      })
      .catch((e: unknown) => {
        console.error("jmw delete file errror", e);
      });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies are actions
  const columns = useMemo<ColumnDef<(typeof screenshots)[0]>[]>(
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
            onClick={() => {
              handleView(row.original.filename);
            }}
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
            onClick={() => {
              handleDelete(row.original.filename);
            }}
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
