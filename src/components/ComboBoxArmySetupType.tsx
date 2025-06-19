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
import { ARMY_SETUP_TYPES, OTHER } from "@/constants";
import { cn } from "@/lib/utils";
import type { ArmySetupType } from "@/types";

const armySetupOptions = ARMY_SETUP_TYPES.map((faction) => ({
  value: faction as ArmySetupType,
  label: faction as ArmySetupType,
}));

interface ComboBoxArmySetupTypeProps {
  onSelectCb: (value: ArmySetupType) => void;
  initialValue: ArmySetupType;
}

export default function ComboBoxArmySetupType({
  initialValue,
  onSelectCb,
}: ComboBoxArmySetupTypeProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

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
          {value}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>None found</CommandEmpty>
            <CommandGroup>
              {armySetupOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === value
                        ? OTHER
                        : (currentValue as ArmySetupType);
                    setValue(cV);
                    onSelectCb(cV);

                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
