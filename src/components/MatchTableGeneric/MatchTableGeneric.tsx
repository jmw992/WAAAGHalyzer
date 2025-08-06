"use client";

import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import { useMemo } from "react";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxWin from "@/components/ComboBoxWin";
import type { RecordingState, ZustandStateAction } from "@/lib/types";
import { DataTable } from "./data-table";

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

type MatchTableProps = MatchColumns & {
  setPlayer1Faction: ZustandStateAction["setPlayer1Faction"];
  setPlayer2Faction: ZustandStateAction["setPlayer2Faction"];
  setRecordingWin: ZustandStateAction["setRecordingWin"];
};

export default function MatchTableGeneric({
  player1Faction,
  player2Faction,
  recordingWin,
  setPlayer1Faction,
  setPlayer2Faction,
  setRecordingWin,
}: MatchTableProps) {
  const columns = useMemo(() => {
    // const
    const player1Cell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
      const initialValue = getValue();

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

      return (
        <ComboBoxFaction
          initialValue={initialValue as null}
          onSelectCb={(val) => {
            setPlayer2Faction(val);
          }}
        />
      );
    };

    const recordingWinCell = ({
      getValue,
    }: CellContext<MatchColumns, unknown>) => {
      const initialValue = getValue();
      return (
        <ComboBoxWin
          initialValue={initialValue as null}
          onSelectCb={(val) => {
            setRecordingWin(val);
          }}
        />
      );
    };
    const clms: ColumnDef<MatchColumns>[] = [
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
    return clms;
  }, [setPlayer1Faction, setPlayer2Faction, setRecordingWin]);

  const data = useMemo(
    () => [
      {
        player1Faction,
        player2Faction,
        recordingWin,
      },
    ],
    [player1Faction, player2Faction, recordingWin],
  );

  return (
    <div className="container mx-auto mt-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
