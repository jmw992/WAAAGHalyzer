"use client";

import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ComboBoxMaps from "@/components/ComboBoxMaps";
import ComboBoxMatchType from "@/components/ComboBoxMatchType";
import { Input } from "@/components/ui/input";
import type { Action, RecordingState } from "@/lib/useZustandStore";

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: skip
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface PreMatchColumns {
  matchNum: number;
  matchType: RecordingState["matchType"];
  map: RecordingState["map"];
  player1Id: RecordingState["player1Id"];
  player2Id: RecordingState["player2Id"];
}

import { PLAYER1, PLAYER2 } from "@/constants";
import { DataTable } from "./data-table";

interface PreMatchTableProps {
  map: RecordingState["map"];
  matchType: RecordingState["matchType"];
  matchNum: number;
  player1Id: RecordingState["player1Id"];
  player2Id: RecordingState["player2Id"];
  defaultPlayer1Id?: RecordingState["player1Id"];
  setMap: Action["setMap"];
  setMatchType: Action["setMatchType"];
  setPlayer1Id: Action["setPlayer1Id"];
  setPlayer2Id: Action["setPlayer2Id"];
}

const getPlayerCell = (
  setPlayerId: (id: string) => void,
  placeholder: string,
  defaultValue: string | null = "",
) => {
  const playerCell = ({ getValue }: CellContext<PreMatchColumns, unknown>) => {
    const initialValue = (getValue() ?? defaultValue ?? "") as string;
    console.log("jmw initialValue", initialValue, "value", initialValue);
    // We need to keep and update the state of the cell normally
    const [localValue, setLocalValue] = useState(initialValue);

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setLocalValue(initialValue);
    }, [initialValue]);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      setPlayerId(localValue);
    };

    return (
      <Input
        value={localValue}
        onChange={(e) => {
          setLocalValue(e.target.value);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    );
  };
  playerCell.displayName = "PlayerCell";
  return playerCell;
};

export default function PreMatchTable({
  map,
  matchType,
  matchNum,
  player1Id,
  player2Id,
  defaultPlayer1Id,
  setMap,
  setMatchType,
  setPlayer1Id,
  setPlayer2Id,
}: PreMatchTableProps) {
  // Local state for input fields

  const matchCell = ({ getValue }: CellContext<PreMatchColumns, unknown>) => {
    const initialValue = getValue();
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
    return (
      <ComboBoxMaps
        initialValue={initialValue as null}
        onSelectCb={(val) => {
          setMap(val);
        }}
      />
    );
  };

  const columns: ColumnDef<PreMatchColumns>[] = [
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
    {
      accessorKey: "player1Id",
      header: PLAYER1,
      cell: getPlayerCell(setPlayer1Id, PLAYER1, defaultPlayer1Id),
    },
    {
      accessorKey: "player2Id",
      header: PLAYER2,
      cell: getPlayerCell(setPlayer2Id, PLAYER2),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <DataTable
        columns={columns}
        data={[
          {
            matchNum: matchNum,
            matchType,
            map,
            player1Id,
            player2Id,
          },
        ]}
      />
    </div>
  );
}
