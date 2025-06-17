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
import { OTHER } from "@/constants";
import {
  deleteSreenshotFile,
  getScreenshotSrc,
  deleteArmySetupFile,
} from "@/lib/fileHandling";
import { useZustandStore } from "@/lib/useZustandStore";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useCallback, useState } from "react";

export function ArmySetupTable() {
  const armySetups = useZustandStore((s) => s.armySetups);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);
  const deleteArmySetup = useZustandStore((s) => s.deleteArmySetup);
  const updateArmySetup = useZustandStore((s) => s.updateArmySetup);
  const addArmySetup = useZustandStore((s) => s.addArmySetup);

  // State for modal
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("jmw modalSrc, modalOpen", modalSrc, modalOpen);

  // Handler to close modal
  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setModalSrc(null);
  }, []);

  const handleDelete = (file: string) => {
    deleteArmySetupFile({
      filename: file,
      subDir: recordingUlid ?? "",
    })
      .then(() => {
        deleteArmySetup(file);
      })
      .catch((e: unknown) => {
        console.error("jmw delete file errror", e);
      });
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
        accessorKey: "file",
        header: "File",
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
    data: armySetups,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
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
    </>
  );
}
