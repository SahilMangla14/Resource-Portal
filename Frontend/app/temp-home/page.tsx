'use client';

import { useEffect, useState } from 'react';
import NucleusScene from '@/components/New/nucleus-scene';
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';

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
                        <div className="flex h-[600px]">
                            <div className="w-[50%] flex items-center px-16">
                                <div className="border rounded-lg py-12 pr-24 dark:bg-slate-950">
                                    <div className="px-10 text-xl">Welcome to,</div>
                                    <div className="px-12 text-8xl font-bold">InfoNest</div>
                                    <div className="px-12 text-muted-foreground text-md">Your one stop destination for everything.</div>
                                </div>
                            </div>
                            <div className="w-[50%] flex justify-center items-center">
                                <NucleusScene />
                            </div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
