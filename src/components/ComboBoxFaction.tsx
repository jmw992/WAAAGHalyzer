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
import { FACTIONS } from "@/constants";
import type { RecordingState } from "@/lib/useZustandStore";
import { cn } from "@/lib/utils";
import type { Faction } from "@/types";

const factionOptions = FACTIONS.map((faction) => ({
  value: faction as Faction,
  label: faction as Faction,
}));

interface FactionComboBoxProps {
  onSelectCb: (value: RecordingState["playerFaction"]) => void;
  initialValue: RecordingState["playerFaction"];
}

export default function FactionComboBox({
  initialValue,
  onSelectCb,
}: FactionComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue ?? "");

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
            : "Select..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search faction..." />
          <CommandList>
            <CommandEmpty>No Faction Found</CommandEmpty>
            <CommandGroup>
              {factionOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value ? null : (currentValue as Faction);
                    setValue(cV ?? "");
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
