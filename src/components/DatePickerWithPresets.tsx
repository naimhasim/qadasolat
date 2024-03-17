"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dispatch } from "react"

export type SelectionItem = {
  name: string;
  value: string | number;
  disabled?: boolean;
}[];

type DatePickerWithPresetsProp = {
  FromSelection: SelectionItem
  date: Date | undefined
  setDate: Dispatch<React.SetStateAction<Date | undefined>>
}
const DatePickerWithPresets = function DatePickerWithPresets( { FromSelection, date, setDate  } : DatePickerWithPresetsProp ) {

  const handleSelectChange = (value: string) => {
    setDate(addDays(new Date(), parseInt(value)));
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {FromSelection.map(({ name, value, disabled }) => (
              <SelectItem key={name} value={value.toString()} disabled={disabled}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleCalendarSelect} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerWithPresets;
