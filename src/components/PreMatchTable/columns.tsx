"use client";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxMaps from "@/components/ComboBoxMaps";
import ComboBoxMatchType from "@/components/ComboBoxMatchType";
import type { RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import React from "react";
// ComboBoxMaps

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface RecordingMatchColumns {
  matchType: RecordingState["matchType"];
  map: RecordingState["map"];
  playerFaction: RecordingState["playerFaction"];
  opponentFaction: RecordingState["opponentFaction"];
  recordingWin: RecordingState["recordingWin"];
}

const matchCell = ({
  getValue,
}: CellContext<RecordingMatchColumns, unknown>) => {
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

const mapCell = ({ getValue }: CellContext<RecordingMatchColumns, unknown>) => {
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

export const columns: ColumnDef<RecordingMatchColumns>[] = [
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
