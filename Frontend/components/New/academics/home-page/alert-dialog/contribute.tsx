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
import { useAddResourceStore } from "@/store/addResource"
import * as React from "react"
import axios from "axios"
axios.defaults.withCredentials = true

export function ContributeAlert() {

    const [semester, setSemester] = React.useState("")
    const [driveLink, setDriveLink] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [resource, addResource, clearResource] = useAddResourceStore((state : any) => [state.resource, state.addResource, state.clearResource])


    React.useEffect(() => {
        addResource({semester : semester})
    }
    , [semester])

    React.useEffect(() => {
        addResource({description : description})
    }
    , [description])

    React.useEffect(() => {
        addResource({link : driveLink})
    }
    , [driveLink])

    const handleSemester = (value: string) => {
        if(value === "None") {
            setSemester("")
        }
        else {
            setSemester(value)
        }

        console.log("SEMESTER", semester)
    }

    const handleDescription = (e: any) => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleDriveLink = (e: any) => {
        e.preventDefault()
        setDriveLink(e.target.value)
    }

    const handleSubmit = async () => {
        try{
            const resourceData = resource
            console.log("Add Resource : ", resourceData)
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${process.env.BACKEND_URL}/api/v1/resource/add`, resourceData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

            console.log("Resource Added succesfully")
              

            setDriveLink("")
            setDescription("")
            clearResource()
        }
        catch(err) {
            console.log(err)
        }
    }


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
                                        <CourseInstructorCombobox type="primary"/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="secondary-instructor">Secondary Instructor (If applicable)</Label>
                                        <CourseInstructorCombobox type="secondary" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="semester">Semester</Label>
                                        <Select onValueChange={handleSemester}>
                                            <SelectTrigger id="semester">
                                                <SelectValue placeholder="Select semester..." />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
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
                                           <CourseTags type="add"/>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea onChange={handleDescription}/>
                                    </div>
                                    <div className="flex flex-col space-y-1.5 mb-2">
                                        <Label htmlFor="link">Drive Link</Label>
                                        <Textarea onChange={handleDriveLink}/>
                                    </div>
                                </div>
                            </form>
                        </AlertDialogDescription>
                    </ScrollArea>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Upload</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
