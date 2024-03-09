'use client';

import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { BsReplyFill } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export function SectionCourseComments({ commentsInfo , courseInfo}) {

    const [commentValue, setCommentValue] = useState('');
    const [currentComments, setCurrentComments] = useState(commentsInfo);

    const handleSubmit = async (e : any) => {
        console.log(commentValue);
        e.preventDefault()
        try {
            // console.log(commentValue)
            console.log("HI")
            const token = localStorage.getItem('authToken')
            const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/comment/create`, { text: commentValue, course_id: courseInfo._id}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)

            // notifySuccess('Comment added successfully')

            const updatedCommentsRes = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${courseInfo._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            setCurrentComments(updatedCommentsRes.data.comments);
            

            // setComments(updatedCommentsRes.data.comments);


            setCommentValue('')
        }
        catch (err) {
            console.log(err)
            // notifyError('Error adding comment')
        }
    }

    const handleInputChange = (e : any) => {
        setCommentValue(e.target.value);
        // console.log(commentValue)
    }

    return (
        <div className="w-[70%] py-8 pl-14 pr-5">
            <div className="text-2xl font-bold px-2">Comments</div>
            <div className="w-full h-[500px] border rounded my-2">
                <div className="w-full h-[85%] border-b">
                    <ScrollArea className="h-full">
                        {currentComments.map((comment, index) => (
                            <div key={index} className="flex justify-between items-center py-2 px-4 border-b bg-white hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-950 dark:hover:bg-slate-900 dark:hover:text-slate-50">
                                <div className="flex space-x-2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{comment.text}</p>
                                        <p className="text-muted-foreground">{comment.author}</p>
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
                        <Input type="text" placeholder="Add comment..." value = {commentValue} onChange={handleInputChange}/>
                    </div>
                    <Button variant="ghost" className="m-1 mx-4" onClick={handleSubmit}>
                        <IoSend size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
