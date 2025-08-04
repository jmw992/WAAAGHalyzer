import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile({ id, label }: { id: string; label: string }) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="pl-0.5" htmlFor={id}>
        {label}
      </Label>
      <Input id={id} type="file" />
    </div>
  );
}
