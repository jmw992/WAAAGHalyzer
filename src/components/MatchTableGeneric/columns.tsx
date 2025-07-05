"use client";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxWin from "@/components/ComboBoxWin";
import type { RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import React from "react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface MatchColumns {
  playerFaction: RecordingState["playerFaction"];
  opponentFaction: RecordingState["opponentFaction"];
  recordingWin: RecordingState["recordingWin"];
}

const playerCell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
  const initialValue = getValue();
  const setPlayerFaction = useZustandStore((state) => state.setPlayerFaction);

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setPlayerFaction(val);
      }}
    />
  );
};

const opponentCell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
  const initialValue = getValue();
  const setOpponentFaction = useZustandStore(
    (state) => state.setOpponentFaction,
  );

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setOpponentFaction(val);
      }}
    />
  );
};

const recordingWinCell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
  const initialValue = getValue();
  const setRecordingWin = useZustandStore((state) => state.setRecordingWin);
  return (
    <ComboBoxWin
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setRecordingWin(val);
      }}
    />
  );
};

export const columns: ColumnDef<MatchColumns>[] = [
  {
    accessorKey: "playerFaction",
    header: "Player Faction",
    cell: playerCell,
  },
  {
    accessorKey: "opponentFaction",
    header: "Opponent Faction",
    cell: opponentCell,
  },
  {
    accessorKey: "recordingWin",
    header: "Result",
    cell: recordingWinCell,
  },
];
