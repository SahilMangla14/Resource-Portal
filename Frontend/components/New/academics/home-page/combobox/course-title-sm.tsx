"use client"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useFiltersStore } from "@/store/filters"

const titles = [
    {
        value: "distributed algorithms",
        label: "Distributed Algorithms",
    },
    {
        value: "linear optimization",
        label: "Linear Optimization",
    },
    {
        value: "environmental humanitites",
        label: "Environmental Humanitites",
    },
]

export function CourseTitleComboboxSm() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const addFilter = useFiltersStore((state : any) => state.addFilter)

    React.useEffect(() => {
        addFilter({courseTitle : value})
    }
    , [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-64"
                >
                    {value
                        ? titles.find((title) => title.value === value)?.label
                        : "Select course title..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search course title..." className="h-9" />
                    <CommandEmpty>No data found.</CommandEmpty>
                    <CommandGroup>
                        {titles.map((title) => (
                            <CommandItem
                                key={title.value}
                                value={title.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {title.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === title.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
