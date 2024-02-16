'use client';

import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { BsReplyFill } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SectionCourseComments({ courseInfo }) {
    return (
        <div className="w-[70%] py-8 pl-14 pr-5">
            <div className="text-2xl font-bold px-2">Comments</div>
            <div className="w-full h-[500px] border rounded my-2">
                <div className="w-full h-[85%] border-b">
                    <ScrollArea className="h-full">
                        {courseInfo.comments.map((comment, index) => (
                            <div key={index} className="flex justify-between items-center py-2 px-4 border-b bg-white hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50">
                                <div className="flex space-x-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{comment.user}</p>
                                        <p className="text-muted-foreground">{comment.comment}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Button variant="outline" className="mx-1">
                                        <BsReplyFill size={18} />
                                    </Button>
                                    <Button variant="outline" className="mx-1">
                                        <MdDelete size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </div>
                <div className="flex justify-between items-center h-[15%]">
                    <div className="px-4 w-full">
                        <Input type="text" placeholder="Add comment..." />
                    </div>
                    <Button variant="ghost" className="m-1 mx-4">
                        <IoSend size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
