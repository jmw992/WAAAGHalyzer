import { useZustandStore } from "@/lib/useZustandStore";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MatchTable() {
  const map = useZustandStore((state) => state.map);
  const matchType = useZustandStore((state) => state.matchType);
  const matches = useZustandStore((state) => state.matches);

  return (
    <div className="container mx-auto py-5">
      <DataTable
        columns={columns}
        data={[
          {
            matchNum: matches.length + 1,
            matchType,
            map,
          },
        ]}
      />
    </div>
  );
}
