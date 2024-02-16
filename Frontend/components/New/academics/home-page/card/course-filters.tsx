import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CourseTags } from "@/components/New/academics/home-page/course-tags"
import { CourseYearCombobox } from "@/components/New/academics/home-page/combobox/course-year"
import { CourseInstructorCombobox } from "@/components/New/academics/home-page/combobox/course-instructor"

export function CourseFiltersCard() {
    return (
        <Card className="w-[350px] border-r min-h-screen">
            <CardHeader>
                <CardTitle>Refine Your Search</CardTitle>
                <CardDescription>By choosing appropriate filters.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div>
                            <CourseTags />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="instructor">Instructor</Label>
                            <CourseInstructorCombobox />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="semester">Semester</Label>
                            <Select>
                                <SelectTrigger id="semester">
                                    <SelectValue placeholder="Select semester..." />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="first">1</SelectItem>
                                    <SelectItem value="second">2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="year">Year</Label>
                            <CourseYearCombobox />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Clear</Button>
                <Button>Apply</Button>
            </CardFooter>
        </Card>
    )
}
