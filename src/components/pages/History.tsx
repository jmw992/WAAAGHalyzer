"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MatchDetailsDialog } from "@/components/MatchDetailsDialog";
import { MatchesTable } from "@/components/MatchesTable";
import type { RecordedMatch } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const getMatchesDb = useZustandStore((state) => state.getMatchesDb);
  const { data: matches, isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatchesDb,
  });

  const [selectedMatch, setSelectedMatch] = useState<RecordedMatch | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewMatch = (match: RecordedMatch) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMatch(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>History</h1>
      <MatchesTable matches={matches ?? []} onView={handleViewMatch} />
      <MatchDetailsDialog
        match={selectedMatch}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
