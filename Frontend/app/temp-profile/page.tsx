'use client';

import { useEffect, useState } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';
import { SectionBookmarks } from '@/components/New/profile/section-bookmarks';
import { SectionPersonalDetails } from '@/components/New/profile/section-personal-details';
import { SectionContributions } from '@/components/New/profile/section-contributions';

export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    const personalInfo = {
        name: "Sahil Mangla",
        batch: "2025",
        upvotes: "23",
        bookmarks: [
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
        ],
        contributions: [
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
        ],
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
                        <SectionPersonalDetails personalInfo={personalInfo} />
                        <div className="flex justify-center">
                            <div className="w-[45%]">
                                <SectionBookmarks personalInfo={personalInfo} />
                            </div>
                            <div className="w-[45%]">
                                <SectionContributions personalInfo={personalInfo} />
                            </div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
