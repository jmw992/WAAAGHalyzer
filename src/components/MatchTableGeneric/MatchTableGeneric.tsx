"use client";

import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxWin from "@/components/ComboBoxWin";
import type { RecordingState, ZustandStateAction } from "@/lib/useZustandStore";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "./data-table";

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

type MatchTableProps = MatchColumns & {
  setPlayerFaction: ZustandStateAction["setPlayerFaction"];
  setOpponentFaction: ZustandStateAction["setOpponentFaction"];
  setRecordingWin: ZustandStateAction["setRecordingWin"];
};

export default function MatchTable({
  playerFaction,
  opponentFaction,
  recordingWin,
  setPlayerFaction,
  setOpponentFaction,
  setRecordingWin,
}: MatchTableProps) {
  const playerCell = ({ getValue }: CellContext<MatchColumns, unknown>) => {
    const initialValue = getValue();

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

    return (
      <ComboBoxFaction
        initialValue={initialValue as null}
        onSelectCb={(val) => {
          setOpponentFaction(val);
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
  const columns: ColumnDef<MatchColumns>[] = [
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

  return (
    <div className="container mx-auto py-5">
      <DataTable
        columns={columns}
        data={[
          {
            playerFaction,
            opponentFaction,
            recordingWin,
          },
        ]}
      />
    </div>
  );
}
