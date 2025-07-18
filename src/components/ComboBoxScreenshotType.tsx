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
import { OTHER, SCREENSHOT_TYPES } from "@/constants";
import { cn } from "@/lib/utils";
import type { ScreenshotType } from "@/types";

const screenshotOptions = SCREENSHOT_TYPES.map((faction) => ({
  value: faction as ScreenshotType,
  label: faction as ScreenshotType,
}));

interface ComboBoxScreenshotTypeProps {
  onSelectCb: (value: ScreenshotType) => void;
  initialValue: ScreenshotType;
}

export default function ComboBoxScreenshotType({
  initialValue,
  onSelectCb,
}: ComboBoxScreenshotTypeProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {initialValue}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search faction..." />
          <CommandList>
            <CommandEmpty>No Screenshot Type</CommandEmpty>
            <CommandGroup>
              {screenshotOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const cV =
                      currentValue === initialValue
                        ? OTHER
                        : (currentValue as ScreenshotType);
                    onSelectCb(cV);

                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      initialValue === option.value
                        ? "opacity-100"
                        : "opacity-0",
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
