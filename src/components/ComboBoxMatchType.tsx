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
import { MATCH_TYPES } from "@/constants";
import type { Faction, MatchTypes } from "@/types";

const matchOptions = MATCH_TYPES.map((matchType) => ({
  value: matchType,
  label: matchType,
}));

type FactionComboBoxProps = {
  onSelectCb: (value: RecordingState["matchType"]) => void;
  initialValue: RecordingState["matchType"];
};

export default function MapComboBox({
  initialValue,
  onSelectCb,
}: FactionComboBoxProps) {
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
          className="w-[150px] justify-between"
        >
          {value
            ? matchOptions.find((framework) => framework.value === value)?.label
            : "Select..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No MatchType Found</CommandEmpty>
            <CommandGroup>
              {matchOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value
                        ? null
                        : (currentValue as MatchTypes);
                    setValue(cV === null ? "" : cV);
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
