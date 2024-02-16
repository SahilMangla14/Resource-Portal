'use client';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/New/theme-provider"
import LoadingIndicator from '@/components/LoadingIndicator'
import { NavigationBar } from '@/components/New/navigation-menu';
import { CourseFiltersCard } from '@/components/New/academics/home-page/card/course-filters';
import { SectionCourseResults } from "@/components/New/academics/home-page/section-course-results";
import { SectionTopContributors } from '@/components/New/academics/home-page/section-top-contributors';


export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

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
                        <div className="flex">
                            <CourseFiltersCard />
                            <div className="flex-1">
                                <ResizablePanelGroup direction="horizontal">
                                    <ResizablePanel defaultSize={80}>
                                        <SectionCourseResults />
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={20}>
                                        <SectionTopContributors />
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
