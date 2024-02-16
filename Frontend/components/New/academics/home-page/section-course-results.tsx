'use client';

import '@fontsource/inter/400.css';
import { Label } from '@/components/ui/label';
import { CourseCodeComboboxSm } from '@/components/New/academics/home-page/combobox/course-code-sm';
import { CourseTitleComboboxSm } from '@/components/New/academics/home-page/combobox/course-title-sm';
import { CourseResultsTable } from '@/components/New/academics/home-page/table/course-results';


export function SectionCourseResults() {
    return (
        <>
            <div className="flex justify-evenly p-6">
                <div>
                    <Label htmlFor="course-code">Course Code: </Label>
                    <CourseCodeComboboxSm />
                </div>
                <div>
                    <Label htmlFor="course-title">Course Title: </Label>
                    <CourseTitleComboboxSm />
                </div>
            </div>
            <div className="px-8">
                <CourseResultsTable />
            </div>
        </>
    );
}
