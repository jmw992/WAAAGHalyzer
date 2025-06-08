"use client";
import React from "react";
import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import type { RecordingState } from "@/lib/useZustandStore";
import ComboBoxFaction from "@/components/ComboBoxFaction";
import { useZustandStore } from "@/lib/useZustandStore";
import ComboBoxWin from "../ComboBoxWin";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RecordingMatchColumns = {
  map: RecordingState["map"];
  playerFaction: RecordingState["playerFaction"];
  opponentFaction: RecordingState["opponentFaction"];
  recordingWin: RecordingState["recordingWin"];
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
  console.log("jmw initialValue", initialValue);
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
    accessorKey: "map",
    header: "Map",
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue();
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);

      return (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
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

export const exampleData: RecordingMatchColumns[] = [
  {
    map: "abc123",
    playerFaction: "Beastmen",
    opponentFaction: "Beastmen",
    recordingWin: true,
  },
];
