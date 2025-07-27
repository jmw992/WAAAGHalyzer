"use client";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxWin from "@/components/ComboBoxWin";
import type { RecordingState } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: skip
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface MatchColumns {
  player1Faction: RecordingState["player1Faction"];
  player2Faction: RecordingState["player2Faction"];
  recordingWin: RecordingState["recordingWin"];
}

const player1Cell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
  const initialValue = getValue();
  const setPlayer1Faction = useZustandStore((state) => state.setPlayer1Faction);

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setPlayer1Faction(val);
      }}
    />
  );
};

const player2Cell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
  const initialValue = getValue();
  const setPlayer2Faction = useZustandStore((state) => state.setPlayer2Faction);

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        setPlayer2Faction(val);
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
    accessorKey: "player1Faction",
    header: "Player1 Faction",
    cell: player1Cell,
  },
  {
    accessorKey: "player2Faction",
    header: "Player2 Faction",
    cell: player2Cell,
  },
  {
    accessorKey: "recordingWin",
    header: "Result",
    cell: recordingWinCell,
  },
];
