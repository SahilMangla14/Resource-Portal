'use client';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import '@fontsource/inter/400.css';
import { useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import LoadingIndicator from '@/components/LoadingIndicator'
import NavigationBar from '@/components/New/navigation-menu';
import TopContributors from '@/components/New/academics/top-contributors';
import { CourseFiltersCard } from '@/components/New/academics/card/course-filters';
import CourseResults from "@/components/New/academics/course-results";


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
                                        <CourseResults />
                                    </ResizablePanel>
                                    <ResizableHandle withHandle />
                                    <ResizablePanel defaultSize={20}>
                                        <TopContributors />
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
