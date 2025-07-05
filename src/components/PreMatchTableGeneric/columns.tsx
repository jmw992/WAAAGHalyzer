"use client";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import ComboBoxMaps from "@/components/ComboBoxMaps";
import ComboBoxMatchType from "@/components/ComboBoxMatchType";
import type { RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: skip
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface PreMatchColumns {
  matchType: RecordingState["matchType"];
  map: RecordingState["map"];
  matchNum: number;
}

const matchCell = ({ getValue }: CellContext<PreMatchColumns, unknown>) => {
  const initialValue = getValue();
  const setMatchType = useZustandStore((state) => state.setMatchType);

  return (
    <ComboBoxMatchType
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setMatchType(val);
      }}
    />
  );
};

const mapCell = ({ getValue }: CellContext<PreMatchColumns, unknown>) => {
  const initialValue = getValue();
  const setMap = useZustandStore((state) => state.setMap);

  return (
    <ComboBoxMaps
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setMap(val);
      }}
    />
  );
};

export const columns: ColumnDef<PreMatchColumns>[] = [
  {
    accessorKey: "matchNum",
    header: "#",
  },
  {
    accessorKey: "matchType",
    header: "Match Type",
    cell: matchCell,
  },
  {
    accessorKey: "map",
    header: "Map",
    cell: mapCell,
  },
];
