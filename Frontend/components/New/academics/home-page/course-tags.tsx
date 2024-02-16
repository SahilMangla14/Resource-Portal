import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function CourseTags() {
    return (
        <>
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
                        Lecture Slides
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
        </>
    )
}
