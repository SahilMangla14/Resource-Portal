'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HiOutlineAcademicCap } from "react-icons/hi2";

export function SectionContributions({ personalInfo }) {
    return (
        <div className="px-4 py-6">
            <div className="text-xl font-bold px-2">Contributions</div>
            <div className="w-full h-[500px] border rounded my-2">
                <div className="w-full h-[100%] border-b">
                    <ScrollArea className="h-full">
                        {personalInfo.contributions.map((contribution, index) => (
                            <div key={index} className="flex justify-between items-center py-4 px-4 border-b bg-white hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50">
                                <div className="flex space-x-2">
                                    <HiOutlineAcademicCap size={70} className="mx-1" />
                                    <div>
                                        <p className="text-lg font-semibold">{contribution.code}</p>
                                        <p className="text-md">{contribution.title}</p>
                                        <p className="text-xs text-muted-foreground">{contribution.upvotes} Upvotes</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Button variant="outline" className="mx-1">
                                        View
                                    </Button>
                                    <Button variant="outline" className="mx-1">
                                        Edit
                                    </Button>
                                    <Button variant="outline" className="mx-1">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
