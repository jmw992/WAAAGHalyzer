"use client";

import { useEffect, useState } from "react";
import { MatchDetailsDialog } from "@/components/MatchDetailsDialog";
import { MatchesTable } from "@/components/MatchesTable";
import type { RecordedMatch } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  const getMatchesDb = useZustandStore((state) => state.getMatchesDb);
  const [selectedMatch, setSelectedMatch] = useState<RecordedMatch | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch matches from the database when the component mounts
    const matches = getMatchesDb();
    matches
      .then((data) => {
        console.log("Fetched matches from database:", data);
        if (data) {
          useZustandStore.setState({ matches: data });
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch matches from database:", error);
      });
  }, [getMatchesDb]);

  const handleViewMatch = (match: RecordedMatch) => {
    setSelectedMatch(match);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMatch(null);
  };

  return (
    <>
      <h1>History</h1>
      <MatchesTable matches={matches} onView={handleViewMatch} />
      <MatchDetailsDialog
        match={selectedMatch}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
