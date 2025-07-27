"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

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
import { LOSS, RESULT_ARRAY, WIN } from "@/constants";
import type { RecordingState } from "@/lib/types";
import { cn } from "@/lib/utils";

const resultOptions = RESULT_ARRAY.map((result) => ({
  value: result,
  label: result,
}));

interface ComboBoxWinProps {
  onSelectCb: (value: RecordingState["recordingWin"]) => void;
  initialValue: RecordingState["recordingWin"];
}

export default function ComboBoxWin({
  initialValue,
  onSelectCb,
}: ComboBoxWinProps) {
  const [open, setOpen] = React.useState(false);
  const value = initialValue === null ? "" : initialValue ? WIN : LOSS;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[1  100px] justify-between"
        >
          {resultOptions.find((map) => map.value === value)?.label ??
            "Select..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandInput placeholder="Win or Loss?" />
          <CommandList>
            <CommandEmpty>Was it a draw?</CommandEmpty>
            <CommandGroup>
              {resultOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value ? null : currentValue === WIN;
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
