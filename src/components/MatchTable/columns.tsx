"use client";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import ComboBoxMaps from "@/components/ComboBoxMaps";
import ComboBoxMatchType from "@/components/ComboBoxMatchType";
import ComboBoxWin from "@/components/ComboBoxWin";
import { LOSS, WIN } from "@/constants";
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
  console.log("jmw initialValue", initialValue);
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
  console.log("jmw initialValue", initialValue);
  const setMap = useZustandStore((state) => state.setMap);

  return (
    <ComboBoxMaps
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        console.log("jmw onSelectCb val", val);
        setMap(val);
      }}
    />
  );
};

const playerCell = ({
  getValue,
}: CellContext<RecordingMatchColumns, unknown>) => {
  const initialValue = getValue();
  console.log("jmw initialValue", initialValue);
  const setPlayerFaction = useZustandStore((state) => state.setPlayerFaction);

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        console.log("jmw onSelectCb val", val);
        setPlayerFaction(val);
      }}
    />
  );
};

const opponentCell = ({
  getValue,
}: CellContext<RecordingMatchColumns, unknown>) => {
  const initialValue = getValue();
  console.log("jmw initialValue", initialValue);
  const setOpponentFaction = useZustandStore(
    (state) => state.setOpponentFaction,
  );

  return (
    <ComboBoxFaction
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        console.log("jmw onSelectCb val", val);
        setOpponentFaction(val);
      }}
    />
  );
};

const recordingWinCell = ({
  getValue,
}: CellContext<RecordingMatchColumns, unknown>) => {
  const initialValue = getValue();
  const setRecordingWin = useZustandStore((state) => state.setRecordingWin);
  return (
    <ComboBoxWin
      initialValue={initialValue as null}
      onSelectCb={(val) => {
        console.log("jmw onSelectCb val", val);
        setRecordingWin(val);
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
