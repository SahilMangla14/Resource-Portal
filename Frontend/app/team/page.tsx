'use client';

import { } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { AiFillInstagram } from "react-icons/ai";
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';
import ojassvi from '../../public/ojassvi_kumar.jpeg';
import sahil from '../../public/sahil.jpeg';
import sakshi from '../../public/sakshi_bansal.jpeg';
import subham from '../../public/subham.jpeg';

export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >

                {isPageLoading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <NavigationBar />
                        <div className="flex justify-center">
                            <div>
                                <div className="pt-12 pb-1 font-bold text-xl text-center">About Us</div>
                                <div className="flex justify-center text-muted-foreground text-sm text-center w-full">
                                    <span className="w-[60%]">
                                        Infonest is a thoughtful initiative to organize and simplify the sharing of resources and materials among different student batches, making life a teeny tiny bit easier for everyone involved.
                                    </span>
                                </div>
                                <div>
                                    <div className="grid grid-cols-4 mt-2">
                                        <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                            <div>
                                                <div className="h-40 w-39 border mt-4">
                                                    <img src={subham ? subham.src : "https://github.com/shadcn.png"} className="h-40 border"></img>
                                                </div>
                                                <div className="text-md text-center mt-2 font-mono">
                                                    Subham
                                                </div>
                                                <div className="text-xs text-center text-muted-foreground">
                                                    Batch of 2024
                                                </div>
                                                <div className="flex space-x-2 justify-center mt-6">
                                                    <a className="cursor-pointer" href="mailto:2020csb1317@iitrpr.ac.in" target="_blank"><MdEmail size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.linkedin.com/in/subham71/" target="_blank"><FaLinkedin size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.instagram.com/_subham71/" target="_blank"><AiFillInstagram size={20} /></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                            <div>
                                                <div className="h-40 w-39 border mt-4">
                                                    <img src={sahil ? sahil.src : "https://github.com/shadcn.png"} className="h-40 border"></img>
                                                </div>
                                                <div className="text-md text-center mt-2 font-mono">
                                                    Sahil
                                                </div>
                                                <div className="text-xs text-center text-muted-foreground">
                                                    Batch of 2025
                                                </div>
                                                <div className="flex space-x-2 justify-center mt-6">
                                                    <a className="cursor-pointer" href="mailto:2021csb1128@iitrpr.ac.in" target="_blank"><MdEmail size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.linkedin.com/in/sahilmangla/" target="_blank"><FaLinkedin size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.instagram.com/sahilmangla148/" target="_blank"><AiFillInstagram size={20} /></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                            <div>
                                                <div className="h-40 w-39 border mt-4">
                                                    <img src={ojassvi ? ojassvi.src : "https://github.com/shadcn.png"} className="h-40 border"></img>
                                                </div>
                                                <div className="text-md text-center mt-2 font-mono">
                                                    Ojassvi Kumar
                                                </div>
                                                <div className="text-xs text-center text-muted-foreground">
                                                    Batch of 2024
                                                </div>
                                                <div className="flex space-x-2 justify-center mt-6">
                                                    <a className="cursor-pointer" href="mailto:2020csb1187@iitrpr.ac.in" target="_blank"><MdEmail size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.linkedin.com/in/ojassvi-kumar/" target="_blank"><FaLinkedin size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.instagram.com/0jassvikumar/" target="_blank"><AiFillInstagram size={20} /></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-center h-72 w-48 border-2 rounded-lg hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50 m-6">
                                            <div>
                                                <div className="h-40 w-39 border mt-4">
                                                    <img src={sakshi ? sakshi.src : "https://github.com/shadcn.png"} className="h-40 border"></img>
                                                </div>
                                                <div className="text-md text-center mt-2 font-mono">
                                                    Sakshi Bansal
                                                </div>
                                                <div className="text-xs text-center text-muted-foreground">
                                                    Batch of 2025
                                                </div>
                                                <div className="flex space-x-2 justify-center mt-6">
                                                    <a className="cursor-pointer" href="mailto:2021mcb1244@iitrpr.ac.in" target="_blank"><MdEmail size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.linkedin.com/in/sakshi-bansal-a0b132234/" target="_blank"><FaLinkedin size={20} /></a>
                                                    <a className="cursor-pointer" href="https://www.instagram.com/sakshi_19603/" target="_blank"><AiFillInstagram size={20} /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto border-t py-2 px-6 flex justify-center items-center dark:bg-secondary font-bold text-md">
                            Made with <div style={{ color: 'red' }} className="px-1">&#x2764;&#xFE0F;</div>
                        </div>
                    </>
                )}

            </ThemeProvider>
        </div>
    );
}
