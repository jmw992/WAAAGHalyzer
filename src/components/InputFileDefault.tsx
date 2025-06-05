import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputFile({
  id,
  label,
  defaultValue,
  onChange,
}: {
  id: string;
  label: string;
  defaultValue?: React.ComponentProps<"input">["defaultValue"];
  onChange?: React.ComponentProps<"input">["onChange"];
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="file"
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
