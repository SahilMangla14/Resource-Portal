'use client';

import '@fontsource/inter/400.css';
import { Label } from '@/components/ui/label';
import { CourseCodeCombobox } from '@/components/New/academics/combobox/course-code';
import { CourseTitleCombobox } from '@/components/New/academics/combobox/course-title';
import { CourseResultsTable } from '@/components/New/academics/table/course-results';


export default function CourseResults() {
    return (
        <>
            <div className="flex justify-evenly p-6">
                <div>
                    <Label htmlFor="course-code">Course Code: </Label>
                    <CourseCodeCombobox />
                </div>
                <div>
                    <Label htmlFor="course-title">Course Title: </Label>
                    <CourseTitleCombobox />
                </div>
            </div>
            <div className="px-8">
                <CourseResultsTable />
            </div>
        </>
    );
}
