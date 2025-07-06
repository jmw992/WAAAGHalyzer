"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import NotesGeneric from "@/components/Notes/NotesGeneric";

export default function Match() {
  const notes = useZustandStore((state) => state.notes);
  const setNotes = useZustandStore((state) => state.setNotes);

  return <NotesGeneric notes={notes} setNotes={setNotes} />;
}
