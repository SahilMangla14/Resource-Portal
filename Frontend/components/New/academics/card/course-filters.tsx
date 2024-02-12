import * as React from "react"

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

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CourseYearCombobox } from "@/components/New/academics/combobox/course-year"

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
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Assignments
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Books
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Endterm Assessments
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Midterm Assessments
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Notes
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Programming Assessments
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Quizzes
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center space-x-4 p-4">
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Video Lectures
                                    </p>
                                </div>
                                <Switch />
                            </div>
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
