'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
axios.defaults.withCredentials = true;

export function SectionContributions({ contributions }) {

    const router = useRouter();

    const handleViewClick = (id : string) => {
        router.push(`/temp-academics/temp-course/${id}`)
    }

    const handleDelete = async (id : string) => {
        try{
            const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/resource/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            // console.log("RESULT",res.data);
            console.log("REMOVED", res.data);
            // console.log("COURSES",courses);
            window.location.reload();
        }
        catch(error){
            console.log(error)
        }
    }


    return (
        <div className="px-4 py-6">
            <div className="text-xl font-bold px-2">Contributions</div>
            <div className="w-full h-[500px] border rounded my-2">
                <div className="w-full h-[100%] border-b">
                    <ScrollArea className="h-full">
                        {contributions.map((contribution, index) => (
                            <div key={index} className="flex justify-between items-center py-4 px-4 border-b bg-white hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50">
                                <div className="flex space-x-2">
                                    <HiOutlineAcademicCap size={70} className="mx-1" />
                                    <div>
                                        <p className="text-lg font-semibold">{contribution.courseCode}</p>
                                        <p className="text-md">{contribution.courseTitle}</p>
                                        <p className="text-xs text-muted-foreground">{contribution.likes} Upvotes</p>
                                    </div>
                                </div>
                                <div className="flex space-y-1">
                                    <Button variant="outline" className="mx-1"  onClick={() => handleViewClick(contribution._id)}>
                                        View
                                    </Button>
                                    <Button variant="outline" className="mx-1" >
                                        Edit
                                    </Button>
                                    <Button variant="outline" className="mx-1"  onClick={() => handleDelete(contribution._id)}>
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
