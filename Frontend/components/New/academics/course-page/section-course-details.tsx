'use client';

import { Button } from "@/components/ui/button";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";

export function SectionCourseDetails({ courseInfo }) {
    return (
        <div className="flex justify-center">
            <div className="w-[95%] border-b py-8 px-2 flex justify-between">
                <div className="flex">
                    <div className="pl-3">
                        <div>
                            <Button variant="secondary" className="w-15 h-10 m-1">
                                <IoMdArrowRoundUp size={20} />
                            </Button>
                        </div>
                        <div>
                            <Button variant="secondary" className="w-15 h-10 m-1">
                                <IoMdArrowRoundDown size={20} />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="px-2 text-2xl font-bold">{courseInfo.code}</div>
                        <div className="px-2 text-xl text-muted-foreground capitalize">{courseInfo.title}</div>
                        <div className="px-2 text-muted-foreground ">Google Drive Link: <a className="text-blue-400 underline " href={courseInfo.link} target="_blank">{courseInfo.link}</a></div>
                        <div className="px-2 text-xs text-muted-foreground">{courseInfo.upvotes} Upvotes</div>
                    </div>
                </div>
                <div>
                    <div className="px-5 text-right text-muted-foreground text-md">
                        Offered by <span className="">{courseInfo.instructors.join(" and ")}</span>
                        <br />Semester {courseInfo.semester}, {courseInfo.year}
                    </div>
                    <div className="text-right">
                        <Button variant="outline" className="w-15 h-9 m-1">
                            <CiBookmark size={20} />
                        </Button>
                        <Button variant="outline" className="w-15 h-9 m-1 mr-5">
                            <IoArrowBackOutline size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
