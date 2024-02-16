'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';
import LoadingIndicator from '@/components/LoadingIndicator'
import { SectionCourseDetails } from '@/components/New/academics/course-page/section-course-details';
import { SectionCourseMetadata } from "@/components/New/academics/course-page/section-course-metadat";
import { SectionCourseComments } from "@/components/New/academics/course-page/section-course-comments";

export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    const courseInfo = {
        id: "bhqecj4p",
        code: "MA517",
        title: "Distributed Algorithms",
        tags: ["quiz", "midterm", "endterm", "notes", "video", "system"],
        instructors: ["Dr. Koushik Mondal", "Dr. Rano Ringo"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Cras metus.",
        year: "2024",
        semester: "2",
        author: "Sahil Mangla",
        batch: "2025",
        link: "www.google.com",
        comments: [{
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person A",
            comment: "I think this content is wrong",
        },
        {
            user: "Person B",
            comment: "@Person B I think you are wrong",
        }],
        upvotes: "38",
    };

    return (
        <div>
            {isPageLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >

                        <NavigationBar />
                        <SectionCourseDetails courseInfo={courseInfo} />
                        <div className="flex justify-center text-sm">
                            <SectionCourseMetadata courseInfo={courseInfo} />
                            <SectionCourseComments courseInfo={courseInfo} />
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
