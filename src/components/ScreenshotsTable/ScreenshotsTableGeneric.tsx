
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ComboBoxScreenshotType from "@/components/ComboBoxScreenshotType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteSreenshotFile, getScreenshotSrc } from "@/lib/fileHandling";
import type { Action, RecordingState } from "@/lib/useZustandStore";

// Modal component for displaying the screenshot image
function ScreenshotModal({
  src,
  open,
  onClose,
}: {
  src: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !src) return null;
  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className="rounded shadow-lg p-4 max-w-full max-h-full flex flex-col items-center">
        <button
          type="button"
          className="self-end mb-2 px-2 py-1 rounded bg-red-400 hover:bg-gray-300"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={src}
          alt="Screenshot"
          className="max-w-[80vw] max-h-[80vh] rounded"
        />
      </div>
    </div>
  );
}

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
  // State for modal
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Handler to view screenshot in modal
  const handleView = useCallback(
    (file: string) => {
      getScreenshotSrc({
        filename: file,
        subDir: recordingUlid ?? "",
      })
        .then((src) => {
          setModalSrc(src);
          setModalOpen(true);
        })
        .catch((err: unknown) => {
          console.error("handleView getScreenshotSrc err:", err);
        });
    },
    [recordingUlid],
  );

  // Handler to close modal
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalSrc(null);
  }, []);

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
        id: "view",
        header: "",
        cell: ({ row }) => (
          <button
            type="button"
            className="p-1 hover:text-primary rounded-2xl hover:bg-gray-700 "
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
          <button
            type="button"
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
      <ScreenshotModal
        src={modalSrc}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
