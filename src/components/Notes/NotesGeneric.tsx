"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { STACKED_LABEL_CLASSNAME } from "@/constants/styles";
export default function NotesGeneric({
  notes,
  setNotes,
}: {
  notes: string | null;
  setNotes: (notes: string) => void;
}) {
  return (
    <div className={STACKED_LABEL_CLASSNAME}>
      <Label className="pl-0.5" htmlFor="notesInput">
        Notes
      </Label>
      <Textarea
        id="notesInput"
        placeholder="Type your message here."
        value={notes ?? "Type your message here."}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
      />
    </div>
  );
}
