import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { useFiltersStore } from "@/store/filters";
import { useAddResourceStore } from "@/store/addResource";
import add from "@/app/add/page";


export function CourseTags({ type }: { type: string }) {


    const [filters, setFilters, addFilter, clearFilters] = useFiltersStore((state: any) => [state.filters, state.setFilters, state.addFilter, state.removeFilter, state.clearFilters])
    const [resource, addResource] = useAddResourceStore((state: any) => [state.resource, state.addResource])

    const [assignments, setAssignments] = React.useState(false);
    const [books, setBooks] = React.useState(false);
    const [endterm, setEndterm] = React.useState(false);
    const [lectureSlides, setLectureSlides] = React.useState(false);
    const [midterm, setMidterm] = React.useState(false);
    const [notes, setNotes] = React.useState(false);
    const [programming, setProgramming] = React.useState(false);
    const [quizzes, setQuizzes] = React.useState(false);
    const [videoLectures, setVideoLectures] = React.useState(false);


    React.useEffect(() => {
        let tags = []
        if (assignments) tags.push("assignments")
        if (books) tags.push("books")
        if (endterm) tags.push("endterm")
        if (lectureSlides) tags.push("lectureSlides")
        if (midterm) tags.push("midterm")
        if (notes) tags.push("notes")
        if (programming) tags.push("programming")
        if (quizzes) tags.push("quizzes")
        if (videoLectures) tags.push("videoLectures")
        if (type === "filter") {

            console.log("filter Tags : ", tags)

            addFilter({ tags: tags });
        }
        else if (type === "add") {
            console.log("Add resource Tags : ", tags)
            addResource({ tags: tags })
        }
    }, [assignments, books, endterm, lectureSlides, midterm, notes, programming, quizzes, videoLectures]);


    return (
        <>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Assignments
                    </p>
                </div>
                <Switch onCheckedChange={() => setAssignments(!assignments)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Books
                    </p>
                </div>
                <Switch onCheckedChange={() => setBooks(!books)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Endterm Assessments
                    </p>
                </div>
                <Switch onCheckedChange={() => setEndterm(!endterm)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Lecture Slides
                    </p>
                </div>
                <Switch onCheckedChange={() => setLectureSlides(!lectureSlides)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Midterm Assessments
                    </p>
                </div>
                <Switch onCheckedChange={() => setMidterm(!midterm)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Notes
                    </p>
                </div>
                <Switch onCheckedChange={() => setNotes(!notes)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Programming Assessments
                    </p>
                </div>
                <Switch onCheckedChange={() => setProgramming(!programming)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Quizzes
                    </p>
                </div>
                <Switch onCheckedChange={() => setQuizzes(!quizzes)} />
            </div>
            <div className="flex items-center space-x-4 p-4">
                <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        Video Lectures
                    </p>
                </div>
                <Switch onCheckedChange={() => setVideoLectures(!videoLectures)} />
            </div>
        </>
    )
}
