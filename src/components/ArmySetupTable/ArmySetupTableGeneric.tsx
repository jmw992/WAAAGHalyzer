import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
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
import type { Action, RecordingState } from "@/lib/types";

interface ArmySetupTableProps {
  armySetups: RecordingState["armySetups"];
  recordingUlid: RecordingState["recordingUlid"];
  deleteArmySetup: Action["deleteArmySetup"];
  updateArmySetup: Action["updateArmySetup"];
}

export function ArmySetupTableGeneric({
  armySetups,
  recordingUlid,
  deleteArmySetup,
  updateArmySetup,
}: ArmySetupTableProps) {
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
        header: "#",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "armySetup",
        header: "Army Setup",
        cell: ({ row }) => row.original.filename,
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
