import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CourseTags } from "@/components/New/academics/home-page/course-tags"
import { CourseCodeCombobox } from "@/components/New/academics/home-page/combobox/course-code"
import { CourseYearCombobox } from "@/components/New/academics/home-page/combobox/course-year"
import { CourseTitleCombobox } from "@/components/New/academics/home-page/combobox/course-title"
import { CourseInstructorCombobox } from "@/components/New/academics/home-page/combobox/course-instructor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContributeAlert() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex justify-center pt-6">
                    <Button variant="secondary" className="w-[80%]">Contribute</Button>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add a new resource</AlertDialogTitle>
                    <ScrollArea className="h-[500px] px-4 py-4">
                        <AlertDialogDescription>
                            <form>
                                <div className="grid w-full items-center gap-4 text-foreground px-1">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="course-code">Course Code</Label>
                                        <CourseCodeCombobox />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="course-title">Course Title</Label>
                                        <CourseTitleCombobox />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="primary-instructor">Primary Instructor</Label>
                                        <CourseInstructorCombobox />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="secondary-instructor">Secondary Instructor (If applicable)</Label>
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
                                    <div className="flex flex-col space-y-1.5">
                                        <div>Tags</div>
                                        <div className="border rounded-lg">
                                           <CourseTags />
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea />
                                    </div>
                                    <div className="flex flex-col space-y-1.5 mb-2">
                                        <Label htmlFor="link">Drive Link</Label>
                                        <Textarea />
                                    </div>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </ScrollArea>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Upload</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
