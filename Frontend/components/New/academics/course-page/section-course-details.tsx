'use client';

import { Button } from "@/components/ui/button";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "react-hook-form";
axios.defaults.withCredentials = true

export function SectionCourseDetails({ courseInfo,user }) {

    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [currentLikes, setCurrentLikes] = useState<number>(courseInfo?.likes || 0);
    const [upvoted,setUpvoted]=useState<boolean>(false)
    const [downvoted,setDownvoted]=useState<boolean>(false)
    const router = useRouter();

    const notifySuccess = (message: string) => {
        toast.success(message);
    };

    const notifyError = (message: string) => {
        toast.error(message);
    }

    useEffect(()=>{
        // console.log(user,"user")
        // if ( courseInfo.peopleWhoLiked.includes(user._id)) 
        //     setUpvoted(true);
        // else 
        //     setUpvoted(false)
        // if (courseInfo.peopleWhoDisliked.includes(user._id))
        //     setDownvoted(true);
        // else setDownvoted(false)
        
        // console.log(row.original.peopleWhoLiked.includes(row.original._id),row.original._id)
    },[])

    const toggleBookmark = async () => {
        // if isBookmarked true, then make a delete request to remove from saved Resources
        // else make a post request to add to saved Resources


        if (isBookmarked) {
            try {
                const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/user/removeSavedResource/${courseInfo._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // notifySuccess("Resource removed from bookmarks")
                setIsBookmarked(false)
            }
            catch (err) {
                // notifyError("Error removing resource from bookmarks")
                console.log(err)
            }
        }
        else {
            try {
                const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/saveResource/${courseInfo._id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // notifySuccess("Resource added to bookmarks")
                setIsBookmarked(true)
            }
            catch (err) {
                // notifyError("Error adding resource to bookmarks")
                console.log(err)
            }
        }
    }

    useEffect(() => {
        // check whether the course is bookmarked or not
        const checkBookmark = async () => {
            try {
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/isBookmarked/${courseInfo._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // console.log(res.data.isBookmarked)
                // console.log("IS BOOKMARKED", res.data.isBookmarked)
                setIsBookmarked(res.data.isBookmarked)
            }
            catch (err) {
                console.log(err)
            }
        }

        checkBookmark()
    }, [])

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                // console.log("******************************")
                const token = localStorage.getItem('authToken')
                const res = await axios.get(
                    `${process.env.BACKEND_URL}/api/v1/resource/isLiked/${courseInfo._id}`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );

    
                if (res.data.liked) {
                    setUpvoted(true)
                }
    
                if (res.data.disliked) {
                    setDownvoted(true)
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchIsLiked();
    }, []);
    

    const handleLikes = async ({ _id, likes }: { _id: string, likes: number }) => {
        try {
            const token = localStorage.getItem('authToken')
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/resource/like/${_id}`, { likes: likes }, { headers: { 'Authorization': `Bearer ${token}` } });
            // console.log(res.data);
            setCurrentLikes(res.data.resource.likes)
            if(res.data.message === "Resource liked successfully!" || res.data.message === "Resource already liked!") {
                setUpvoted(true)
                setDownvoted(false)
            }
            else if(res.data.message === "Resource neither liked nor disliked!"){
                setUpvoted(false)
                setDownvoted(false)
            }

            // console.log("LIKED", res.data.message)
        } catch (err) {
            console.error(err);
        }
    }

    const handleDislikes = async ({ _id, likes }: { _id: string, likes: number }) => {
        try {
            // console.log("HEY THERE")
            const token = localStorage.getItem('authToken')
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/resource/dislike/${_id}`, { likes: likes }, { headers: { 'Authorization': `Bearer ${token}` } });
            setCurrentLikes(res.data.resource.likes)
            if(res.data.message === "Resource disliked successfully!" || res.data.message === "Resource already disliked!") {
                setDownvoted(true)
                setUpvoted(false)
            }
            else if(res.data.message === "Resource neither liked nor disliked!"){
                setDownvoted(false)
                setUpvoted(false)
            }

            // console.log("DISLIKED", res.data.message)
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <div className="flex justify-center">
                <div className="w-[95%] border-b py-8 px-2 flex justify-between">
                    <div className="flex">
                        <div className="pl-3">
                            <div>
                                <Button variant={`${upvoted?'default':'secondary'}`} className={`w-15 h-9 m-1 ${upvoted?'bg-gray-300':''}`} onClick={() => handleLikes({ _id: courseInfo._id, likes: courseInfo.likes})}>
                                    <IoMdArrowRoundUp size={20}  />
                                </Button>
                            </div>
                            <div>
                                {<Button variant={`${downvoted?'default':'secondary'}`} className={`w-15 h-9 m-1 ${downvoted?'bg-gray-300':''}`} onClick={() => handleDislikes({ _id: courseInfo._id, likes: courseInfo.likes})}>
                                    <IoMdArrowRoundDown size={20}  />
                                </Button>}
                                {/* {currentLikes==0&&<Button variant={`${downvoted?'default':'secondary'}`} disabled className={`w-15 h-9 m-1 ${downvoted?'bg-gray-300':''}`} onClick={() => handleDislikes({ _id: courseInfo._id, likes: courseInfo.likes})}>
                                    <IoMdArrowRoundDown size={20}  />
                                </Button>} */}
                            </div>
                        </div>
                        <div>
                            <div className="px-2 text-2xl font-bold">{courseInfo?.courseCode}</div>
                            <div className="px-2 text-xl text-muted-foreground capitalize">{courseInfo?.courseTitle}</div>
                            <div className="px-2 text-muted-foreground ">Google Drive Link: <a className="text-blue-400 underline " href={courseInfo?.link} target="_blank">{courseInfo.link}</a></div>
                            <div className="px-2 text-xs text-muted-foreground">{currentLikes} Votes</div>
                        </div>
                    </div>
                    <div>
                        <div className="px-5 text-right text-muted-foreground text-md">
                            Offered by <span className="">{courseInfo?.instructor_primary} {courseInfo?.instructor_secondary !== "" ? "and " + courseInfo?.instructor_secondary : ""}</span>
                            <br />Semester {courseInfo?.semester}, {courseInfo?.year}
                        </div>
                        <div className="text-right">
                            <Button variant={`${isBookmarked?'default':'secondary'}`}  className="w-15 h-10 m-1" onClick={toggleBookmark}>
                                <CiBookmark size={20} />
                            </Button>
                            <Button variant="outline" className="w-15 h-10 m-1" onClick={() => router.back()}>
                                <IoArrowBackOutline size={20} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" /> */}
        </>
    );
}
