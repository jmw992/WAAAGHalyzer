"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { RecordingState } from "@/lib/useZustandStore";
import { RESULT_ARRAY, WIN } from "@/constants";

const factionOptions = RESULT_ARRAY.map((result) => ({
  value: result,
  label: result,
}));

type ComboBoxWinProps = {
  onSelectCb: (value: RecordingState["recordingWin"]) => void;
  initialValue: RecordingState["recordingWin"];
};

export default function ComboBoxWin({
  initialValue,
  onSelectCb,
}: ComboBoxWinProps) {
  console.log("jmw FactionComboBox");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    initialValue === null ? "" : initialValue,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? factionOptions.find((framework) => framework.value === value)
                ?.label
            : "Select Result..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Win or Loss?" />
          <CommandList>
            <CommandEmpty>Was it a draw?</CommandEmpty>
            <CommandGroup>
              {factionOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value ? null : currentValue === WIN;
                    setValue(cV === null ? "" : currentValue);
                    onSelectCb(cV);

                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
