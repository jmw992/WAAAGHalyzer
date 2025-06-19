// import ComboBoxScreenshotType from "@/components/ComboBoxScreenshotType";
import ComboBoxArmySetupType from "@/components/ComboBoxArmySetupType";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteArmySetupFile } from "@/lib/fileHandling";
import { useZustandStore } from "@/lib/useZustandStore";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useCallback, useState } from "react";

export function ArmySetupTable() {
  const armySetups = useZustandStore((s) => s.armySetups);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);
  const deleteArmySetup = useZustandStore((s) => s.deleteArmySetup);
  const updateArmySetup = useZustandStore((s) => s.updateArmySetup);

  // State for modal
  const [_modalSrc, setModalSrc] = useState<string | null>(null);
  const [_modalOpen, setModalOpen] = useState(false);

  // Handler to close modal
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalSrc(null);
  }, []);

  const handleDelete = async (file: string) => {
    await deleteArmySetupFile({
      filename: file,
      subDir: recordingUlid ?? "",
    });
    deleteArmySetup(file);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies are actions
  const columns = useMemo<ColumnDef<(typeof armySetups)[0]>[]>(
    () => [
      {
        accessorKey: "index",
        header: "",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "armySetup",
        header: "Army Setup",
        cell: ({ row }) => row.original.origFilename,
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          return (
            <ComboBoxArmySetupType
              initialValue={row.original.type}
              onSelectCb={(armySetupType) => {
                updateArmySetup(row.index, {
                  filename: row.original.filename,
                  type: armySetupType,
                  origFilename: row.original.origFilename,
                });
              }}
            />
          );
        },
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
              void handleDelete(row.original.filename);
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
    data: armySetups,
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
                No Army Setups
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
