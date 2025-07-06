"use client";

import { Textarea } from "@/components/ui/textarea";

export default function NotesGeneric({
  notes,
  setNotes,
}: {
  notes: string | null;
  setNotes: (notes: string) => void;
}) {
  return (
    <>
      <label htmlFor="notesInput">Notes</label>
      <Textarea
        id="notesInput"
        placeholder="Type your message here."
        value={notes ?? "Type your message here."}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
      />
    </>
  );
}
