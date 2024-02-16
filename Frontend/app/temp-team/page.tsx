'use client';

import { } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { AiFillInstagram } from "react-icons/ai";
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
                        <div className="flex justify-center">
                            <div>
                                <div className="pt-12 pb-1 font-bold text-xl text-center">About Us</div>
                                <div className="flex justify-center text-muted-foreground text-sm text-center w-full">
                                    <span className="w-[60%]">
                                        Infonest is a thoughtful initiative to organize and simplify the sharing of resources and materials among different student batches, making life a teeny tiny bit easier for everyone involved.
                                    </span>
                                </div>
                                <div className="grid grid-cols-5 mt-2">
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                        <div>
                                            <div className="h-40 w-36 border mt-4">
                                                <img src="https://github.com/shadcn.png" className="h-40 border"></img>
                                            </div>
                                            <div className="text-md text-center mt-1">
                                                Sahil Mangla
                                            </div>
                                            <div className="text-xs text-center text-muted-foreground">
                                                Batch of 2025
                                            </div>
                                            <div className="flex space-x-2 justify-center mt-6">
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><MdEmail size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><FaLinkedin size={20} /></a>
                                                <a className="cursor-pointer" href="www.google.com" target="_blank"><AiFillInstagram size={20} /></a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-6 border-t py-2 px-6 flex justify-center items-center dark:bg-secondary font-bold text-md">
                            Made with <div style={{ color: 'red' }} className="px-1">&#x2764;&#xFE0F;</div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
