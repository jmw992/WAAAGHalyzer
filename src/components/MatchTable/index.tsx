import { useZustandStore } from "@/lib/useZustandStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MatchTable() {
  const playerFaction = useZustandStore((state) => state.playerFaction);
  const opponentFaction = useZustandStore((state) => state.opponentFaction);
  const recordingWin = useZustandStore((state) => state.recordingWin);

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
