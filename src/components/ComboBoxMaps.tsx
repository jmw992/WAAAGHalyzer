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
import { MAPS } from "@/constants/maps";
import type { RecordingState } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Faction } from "@/types";

const mapOptions = MAPS.map((map) => ({
  value: map,
  label: map,
}));

interface FactionComboBoxProps {
  onSelectCb: (value: RecordingState["map"]) => void;
  initialValue: RecordingState["map"];
}

export default function MapComboBox({
  initialValue,
  onSelectCb,
}: FactionComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const value = initialValue ?? "";
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? mapOptions.find((framework) => framework.value === value)?.label
            : "Select..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search maps..." />
          <CommandList>
            <CommandEmpty>No Map Found</CommandEmpty>
            <CommandGroup>
              {mapOptions.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value ? null : (currentValue as Faction);
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
