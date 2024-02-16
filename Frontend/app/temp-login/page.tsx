'use client';

import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { SiInformatica } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"

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

                        <div className="flex h-screen">
                            <Skeleton className="w-[50%]">
                                <div className="h-full">
                                    <div className="flex items-center p-10">
                                        <SiInformatica size={40} />
                                        <p className="ml-2 text-2xl font-bold">InfoNest</p>
                                    </div>
                                    <div className="h-[70%]"></div>
                                    <div className="px-8 font-bold text-lg">Good to see you back.</div>
                                </div>
                            </Skeleton>
                            <div className="w-[50%] flex justify-center items-center">
                                <div >
                                    <div className="text-2xl font-bold text-center">Account Sign In</div>
                                    <div className="text-md text-muted-foreground text-center py-1">Click the button below to log in to your account.</div>
                                    <div className="px-4 py-3">
                                        <Button variant="outline" className="w-full">
                                            <FaGoogle size={18} className="mx-2" />
                                            Sign In with Google
                                        </Button>
                                    </div>
                                    <div className="text-muted-foreground text-center py-1 text-xs">
                                        Do not already an account? Click <span className="underline font-bold">SignUp</span>
                                        <br /> to create your account right now.
                                    </div>
                                </div>
                            </div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
