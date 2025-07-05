"use client";

import type { CellContext, ColumnDef, RowData } from "@tanstack/react-table";
import ComboBoxMaps from "@/components/ComboBoxMaps";
import ComboBoxMatchType from "@/components/ComboBoxMatchType";
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
	matchType: RecordingState["matchType"];
	map: RecordingState["map"];
	matchNum: number;
}

import { DataTable } from "./data-table";

interface PreMatchTableProps {
	map: RecordingState["map"];
	matchType: RecordingState["matchType"];
	matchNum: number;
	setMap: Action["setMap"];
	setMatchType: Action["setMatchType"];
}

export default function PreMatchTable({
	map,
	matchType,
	matchNum,
	setMap,
	setMatchType,
}: PreMatchTableProps) {
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
					},
				]}
			/>
		</div>
	);
}
