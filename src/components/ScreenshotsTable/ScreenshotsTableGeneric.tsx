import { DialogTitle } from "@radix-ui/react-dialog";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ComboBoxScreenshotType from "@/components/ComboBoxScreenshotType";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { deleteSreenshotFile, getScreenshotSrc } from "@/lib/fileHandling";
import type { Action, RecordingState } from "@/lib/types";

interface ScreenshotsTableProps {
  screenshots: RecordingState["screenshots"];
  recordingUlid: RecordingState["recordingUlid"];
  deleteScreenshot: Action["deleteScreenshot"];
  updateScreenshot: Action["updateScreenshot"];
}

export function ScreenshotsTableGeneric({
  screenshots,
  recordingUlid,
  deleteScreenshot,
  updateScreenshot,
}: ScreenshotsTableProps) {
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (selectedScreenshot) {
      getScreenshotSrc({
        filename: selectedScreenshot,
        subDir: recordingUlid ?? "",
      })
        .then(setModalSrc)
        .catch((err: unknown) => {
          console.error("handleView getScreenshotSrc err:", err);
        });
    } else {
      setModalSrc(null);
    }
  }, [selectedScreenshot, recordingUlid]);

  const handleDelete = (file: string) => {
    deleteSreenshotFile({
      filename: file,
      subDir: recordingUlid ?? "",
    })
      .then(() => {
        deleteScreenshot(file);
      })
      .catch((e: unknown) => {
        console.error("deleteSreenshotFile errror", e);
      });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies are actions
  const columns = useMemo<ColumnDef<(typeof screenshots)[0]>[]>(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "Screenshot",
        header: "Screenshot",
        cell: ({ row }) => row.original.filename,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          return (
            <ComboBoxScreenshotType
              initialValue={row.original.type}
              onSelectCb={(screenshotType) => {
                updateScreenshot(row.index, {
                  filename: row.original.filename,
                  type: screenshotType,
                });
              }}
            />
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const screenshot = row.original;
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
                <DropdownMenuItem
                  onClick={() => setSelectedScreenshot(screenshot.filename)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(screenshot.filename)}
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
    ],
    [modalSrc],
  );

  const table = useReactTable({
    data: screenshots,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
      </div>
      <Dialog
        open={!!selectedScreenshot}
        onOpenChange={(open) => {
          if (!open) setSelectedScreenshot(null);
        }}
      >
        <DialogContent className="h-9/10 w-9/10">
          <DialogTitle className="text-lg font-semibold">
            Screenshot: {selectedScreenshot}
          </DialogTitle>
          {modalSrc ? (
            <img
              src={modalSrc}
              alt="Screenshot"
              className="max-w-full max-h-full rounded"
            />
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
