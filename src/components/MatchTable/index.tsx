import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useZustandStore } from "@/lib/useZustandStore";

export default function MatchTable() {
  const playerFaction = useZustandStore((state) => state.playerFaction);
  const opponentFaction = useZustandStore((state) => state.opponentFaction);
  const map = useZustandStore((state) => state.map);
  const recordingWin = useZustandStore((state) => state.recordingWin);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={[
          {
            playerFaction,
            opponentFaction,
            map,
            recordingWin,
          },
        ]}
      />
    </div>
  );
}
