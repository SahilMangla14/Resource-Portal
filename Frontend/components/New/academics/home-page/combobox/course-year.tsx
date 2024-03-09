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
import { useAddResourceStore } from "@/store/addResource"
import add from "@/app/add/page"

const years = [
    {
        value: "2023",
        label: "2023",
    },
    {
        value: "2022",
        label: "2022",
    },
    {
        value: "2021",
        label: "2021",
    },
    {
        value: "2020",
        label: "2020",
    },
    {
        value: "2019",
        label: "2019",
    },
]

export function CourseYearCombobox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [resource, addResource] = useAddResourceStore((state : any) => [state.resource, state.addResource])

    React.useEffect(() => {
        addResource({ year: value })
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value
                        ? years.find((year) => year.value === value)?.label
                        : "Select year..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder="Search year..." className="h-9" />
                    <CommandEmpty>No data found.</CommandEmpty>
                    <CommandGroup>
                        {years.map((year) => (
                            <CommandItem
                                key={year.value}
                                value={year.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {year.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === year.value ? "opacity-100" : "opacity-0"
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
