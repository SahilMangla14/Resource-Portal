"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { StaticImageData } from 'next/image';
import img from '../../assets/study.png'
import axios from 'axios'
import { get } from 'http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'react-hook-form';
import img1 from '../../assets/img_backtoschool.jpg';
import img2 from '../../assets/img_bookclub.jpg';
import img3 from '../../assets/img_code.jpg';
import img4 from '../../assets/img_bookclub.jpg';
import img5 from '../../assets/img_read.jpg';
import like from '../../assets/heart.svg';
import unlike from '../../assets/unlike.svg';
import bookmark from '../../assets/save.svg';
import unbookmark from '../../assets/unsave.svg';
import bin from '../../assets/bin.svg';
import dislike from '../../assets/dislike.svg'
import no_dislike from '../../assets/no_dislike.svg'
import send from '../../assets/send.svg'
import moment from 'moment';
import edit from '../../assets/edit.svg'
import replyhere from '../../assets/reply.svg'

const defaultBg = [img1,img2,img3,img4,img5];

type Course = {
    image: StaticImageData;
    courseTitle:string,
    courseCode: string;
    instructor: string;
    year: string;
    semester:string;
    description:string,
    uploaded_by: string;
    likes: number;
    link: string;
    
};

type Comment = {
    _id: string;
    author: string;
    text: string;
    likedBy: string[];
    dislikedBy: string[];
    createdAt:any;
    parent:string
};

const InitialCourse = {
    image: img,
    courseCode: 'COURSE CODE',
    courseTitle:'',
    instructor: 'INSTRUCTOR',
    year: '',
    semester:'',
    description:'Resource of course',
    uploaded_by: 'XYZ',
    likes: 0,
    link: 'https://drive.google.com',
  
};

type User={
    name:string,
    _id:string,
}

const u1={
    name:'Username',
    _id:'abc'
}

interface framework{
    comments:Comment[];
    user:User;
    handleLike:({ id, likedBy, author }: { id: any; likedBy: any; author: string })=>void;
    handleDislike:({ id, dislikedBy, author }: { id: any; dislikedBy: any; author: string })=>void;
    handleDelete:(id:any)=>void;
    handleEdit:({ id,  commentValue }: { id: any; commentValue: string })=>void;
    id:any
}

interface framework2{
    comment:Comment;
    user:User;
    handleLike:({ id, likedBy, author }: { id: any; likedBy: any; author: string })=>void;
    handleDislike:({ id, dislikedBy, author }: { id: any; dislikedBy: any; author: string })=>void;
    handleDelete:(id:any)=>void;
    handleEdit:({ id,  commentValue }: { id: any; commentValue: string })=>void;
    id:any
}

const randomIndex = Math.floor(Math.random() * defaultBg.length);
const bgImage=defaultBg[randomIndex]

export default function CoursePage({ params }: any) {

    const [likes, setLikes] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([])
    const [course, setCourse] = useState<Course>(InitialCourse)
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [render,setRender]=useState<boolean>(false);
    const [uploader,setUploader]=useState<boolean>(false);
    const [user,setUser]=useState<User>(u1)
    // console.log("params",params);
    

    const toggleBookmark = async () => {
        // if isBookmarked true, then make a delete request to remove from saved Resources
        // else make a post request to add to saved Resources
        
        if(isBookmarked){
            try{
                const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/user/removeSavedResource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // notifySuccess("Resource removed from bookmarks")
                setIsBookmarked(false)
            }
            catch(err){
                notifyError("Error removing resource from bookmarks")
                console.log(err)
            }
        }
        else{
            try{
                const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/saveResource/${params.id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // notifySuccess("Resource added to bookmarks")
                setIsBookmarked(true)
            }
            catch(err){
                notifyError("Error adding resource to bookmarks")
                console.log(err)
            }
        }
};
    // const {register, handleSubmit, reset } = useForm();


    const [commentValue, setCommentValue] = useState('')

    


    const handleLike = async({ id, likedBy,author}: { id: any; likedBy: any ,author:string}) => {
        if(author===user.name) return
        try{

            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/comment/update/${params.id}`,{likedBy:likedBy,comment_id:id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
           setLikes((prev)=>!prev)
           setRender((prev)=>!prev)
            // console.log(res)
        }catch (err:any) {
            
            console.log(err.message)
            notifyError('Error liking comment')
        }
    }
    const handleDislike = async({ id, dislikedBy,author }: { id: any; dislikedBy: any,author:string }) => {
        if(author===user.name) return
        try{
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/comment/update/${params.id}`,{dislikedBy:dislikedBy,comment_id:id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(res.data)
            setRender((prev)=>!prev)
        }catch (err:any) {
            console.log(err.message)
            notifyError('Error disliking comment')
        }
    }

    const handleDelete=async(id:any)=>{
        try{
            const res = await axios.delete(`${process.env.BACKEND_URL}/api/v1/comment/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            console.log(res.data)
            setRender((prev)=>!prev)
        }catch (err:any) {
            console.log(err.message)
            notifyError('Error deleting comment')
        }
     }
    

    const notifySuccess = (message: string) => {
        toast.success(message);
    };

    const notifyError = (message: string) => {
        toast.error(message);
    }

    const handleEdit=async({id,commentValue}:{id:any,commentValue:string})=>{
       
        try {
        
            const editedCommentsRes = await axios.put(`${process.env.BACKEND_URL}/api/v1/comment/update/${params.id}`,{text:commentValue,comment_id:id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            // console.log(updatedCommentsRes.data);

            setRender((prev)=>!prev)          
        }
        catch (err) {
            // console.log(err)
            notifyError('Error adding comment')
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            // console.log(commentValue)
            const token = localStorage.getItem('authToken')
            const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/comment/create`, { text: commentValue, course_id: params.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)

            notifySuccess('Comment added successfully')

            const updatedCommentsRes = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            // console.log(updatedCommentsRes.data);
            const sortedComments=updatedCommentsRes.data.comments.sort((a:any,b:any)=>{
                const timeA=new Date(a.createdAt)
                const timeB=new Date(b.createdAt)
                if(timeA.getTime()!==timeB.getTime()) return timeB.getTime()-timeA.getTime()
                else return b.likedBy.length-a.likedBy.length
            })

            const filteredComments=sortedComments.filter((c:Comment)=>!c.parent||c.parent.length===0)

            setComments(filteredComments)
            

            // setComments(updatedCommentsRes.data.comments);


            setCommentValue('')
        }
        catch (err) {
            // console.log(err)
            notifyError('Error adding comment')
        }

    }

    useEffect(() => {
        // get comments for this course
        const getComments = async () => {
            try {
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)

                const filteredComments=res.data.comments.filter((c:Comment)=>!c.parent||c.parent.length===0)
                // console.log("fileter",filteredComments)
            
                const sortedComments=filteredComments.sort((a:any,b:any)=>{
                    const timeA=new Date(a.createdAt)
                    const timeB=new Date(b.createdAt)
                    if(timeA.getTime()!==timeB.getTime()) return timeB.getTime()-timeA.getTime()
                    else return b.likedBy.length-a.likedBy.length
                })

                setComments(sortedComments)
                
                console.log("res",res.data);
                const currentUser= await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`,{
                    params: {user:res.data.user},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log("currentUser",currentUser);
                setUser(currentUser.data.user)
                
            }
            catch (err) {
                console.log(err)
            }
        }

        getComments()

    }, [render])

    useEffect(() => {
        // check whether the course is bookmarked or not
        const checkBookmark = async () => {
            try {
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/isBookmarked/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                // console.log(res.data.isBookmarked)
                setIsBookmarked(res.data.isBookmarked)
            }
            catch (err) {
                console.log(err)
            }
        }

        checkBookmark()
    },[])




    // setCourse from backend
    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)

                const newData = res.data.resource
                newData.image = img
                setCourse(newData)
                
                console.log(newData.uploaded_by)
                const uploaderRes= await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`,{
                    params: {user:newData.uploaded_by},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log(uploaderRes)
                setUploader(uploaderRes.data.user.name)
                // console.log(uploaderRes.data.user.name)
                
            }
            catch (err) {
                console.log(err)
            }
        }

        getCourse()
    }, [])




    return (
        <>
            <div className='w-full h-full sm:h-screen flex flex-col justify-center items-center bg-[#F0F8FF] text-white gap-10'>
                
                    <div className='relative w-[80%] h-[30%]'>
                        <Image src={bgImage} alt="Your Image" layout="fill" objectFit='cover'  />

                        <div className='absolute bottom-0 left-0 p-5' >
                            <div className='flex flex-col text-white'>
                                <h1 className='font-bold text-3xl'>{course.courseCode} {course.courseTitle} <span className='text-gray-300'>{course.year}-{course.semester}</span></h1>
                                <p className='text-lg'>{course.description}</p>
                            </div>
                        
                        </div>    

                   

                </div>
                <div className='flex flex-col sm:flex-row md:w-[80%] h-[60%] gap-10'>
                    <div className='p-2  bg-gradient-to-r shadow-2xl from-[#72A0C1] via-[#B9D9EB] to-[#72A0C1] shadow-[#72A0C1] md:w-[25%] h-[45%] min-w-fit lg:h-[40%] md:h-[70%] min-h-fit rounded-3xl'>
                       

                        
                        <div className='flex flex-row justify-between m-3'>
                        <div className='flex flex-col gap-1 m-4'>
                            <p className='text-gray-500 font-bold'>Instructor : <span className='text-gray-600'>{course.instructor}</span></p>
                            <p className='text-gray-500 font-bold'>Uploaded By: <span className='text-gray-600'>{uploader}</span></p>
                        </div>
                                 <Image src={isBookmarked?bookmark:unbookmark} alt='' className='w-10 h-10 hover:scale-105 m-auto' onClick={toggleBookmark}/>
                        </div>
                              <div className='w-full flex items-center justify-center'>
                               <a className="mt-2 inline-block bg-[#002244] m-auto   hover:shadow-[#002244] hover:shadow-xl text-white px-4 py-2 rounded-3xl transition duration-500" href={course.link}  >Go to Course</a>
                              </div>
                               
                    </div>
                    <div className='flex flex-col gap-0 md:w-[70%] w-full p-4 h-full'>
                          <form onSubmit={handleSubmit}>
                        <div className=' shadow-2xl shadow-white border-2 border-gray-500 w-full h-10 m-3 rounded-3xl flex justify-between bg-white/70 '>

                           <input
                                placeholder="Add Comment"
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)} className='bg-transparent p-3 outline-none text-gray-900 font-semibold w-[90%]'  />
                           <button className='w-6 h-6 mr-3 m-auto' type="submit"><Image src={send} alt='' className='m-auto opacity-60 hover:opacity-90'/></button>
                        </div>
                          </form>
                          <div className=' sm:h-[70%]  mb-10 '>
                            <h1 className='font-bold text-black text-2xl p-5'>Comments</h1>
                            <div className=' w-full flex flex-col gap-0 overflow-scroll h-full'>
                                {comments&&<CommentSection comments={comments} user={user} handleLike={handleLike} handleDislike={handleDislike} handleDelete={handleDelete} handleEdit={handleEdit} id={params.id}/>}

                            </div>
                          </div>

                    </div>
                </div>
            </div>

            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </>
    );
}

 const CommentSection : React.FC<framework>=({comments,user,handleLike,handleDislike,handleDelete,handleEdit,id})=>{


    return (<>
   
        {comments && comments.map((comment) => (
            <Comment key={comment._id} comment={comment} user={user} handleLike={handleLike} handleDelete={handleDelete} handleDislike={handleDislike} handleEdit={handleEdit} id={id}/>
           
        ))} </>
    )
}

const Comment:  React.FC<framework2>=({comment,user,handleLike,handleDislike,handleDelete,handleEdit,id})=>{
    
    const [editMe,setEditMe]=useState<boolean>(false)
    const [commentValue,setCommentValue]=useState<string>(comment.text)
    const [reply,setReply]=useState<string>('')
    const [comments,setComments]=useState<Comment[]>([])
    const [replyTo,setReplyTo]=useState<boolean>(false)
    const [showReplies,setShowReplies]=useState<boolean>(false)

    const handleSubmit=()=>{
        handleEdit({id:comment._id,commentValue:commentValue})
        setEditMe((prev)=>!prev)
        
    }

    useEffect(()=>{
        const getComments =async()=>{

            try{
                const commentRes = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                // console.log(updatedCommentsRes.data);
    
                const filteredComments=commentRes.data.comments.filter((c:Comment)=>c.parent===comment._id)
    
                const sortedComments=filteredComments.sort((a:any,b:any)=>{
                    const timeA=new Date(a.createdAt)
                    const timeB=new Date(b.createdAt)
                    if(timeA.getTime()!==timeB.getTime()) return timeB.getTime()-timeA.getTime()
                    else return b.likedBy.length-a.likedBy.length
                })
    
                setComments(sortedComments)
            }
            catch (err) {
                // console.log(err)
                
            }
        }
        getComments();
    },[comments])

    const handleReplyToComment=async (e:any)=>{
        e.preventDefault()
        try {
            // console.log(commentValue)
            const token = localStorage.getItem('authToken')
            const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/comment/create`, { text: reply, course_id: id,parent:comment._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)

           console.log("done")

            const commentRes = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            // console.log(updatedCommentsRes.data);

            const filteredComments=commentRes.data.comments.filter((c:Comment)=>c.parent===comment._id)

            const sortedComments=filteredComments.sort((a:any,b:any)=>{
                const timeA=new Date(a.createdAt)
                const timeB=new Date(b.createdAt)
                if(timeA.getTime()!==timeB.getTime()) return timeB.getTime()-timeA.getTime()
                else return b.likedBy.length-a.likedBy.length
            })

            setComments(sortedComments)
            setReplyTo(false)
            setShowReplies(true)
            console.log(sortedComments)
            // setComments(updatedCommentsRes.data.comments);


            setReply('')
        }
        catch (err) {
            // console.log(err)
            
        }

    }

    const handleArrowUp=()=>{
        setShowReplies(false)
        setReplyTo(false)
    }
    
    return (
        <>
             <div key={comment._id} className=" p-2 border rounded-lg shadow-md bg-white text-black text-sm">
                <p><strong>{comment.author}</strong><span className='text-gray-500 ml-3'>{moment(comment.createdAt).fromNow()}</span></p>
                {!editMe&&<p>{comment.text}</p>}



                {editMe&& 
                <form onSubmit={handleSubmit}>

               
                        <div className=' w-full h-6 m-1 rounded-3xl flex flex-row justify-between bg-white/70 '>

                           <input
                                placeholder="Edit"
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)} className='bg-transparent p-2 outline-none text-gray-900 font-semibold w-[90%]'  />
                           <button className='w-6 h-6 mr-3 m-auto' type='submit'><Image src={send} alt='' className='m-auto opacity-60 hover:opacity-90'/></button>
                        </div>
                 </form>
               }

               

                <div className="mt-2 flex items-center space-x-2">
                    <button onClick={()=>handleLike({id:comment._id,likedBy:comment.likedBy,author:comment.author})} className="flex items-center text-black hover:scale-105">
                        <Image className="mr-1 h-5 w-5 hover:scale-105 transition-all" src={comment.likedBy.includes(user._id)?like:unlike} alt=''/>{comment.likedBy.length}
                    </button>
                    <button onClick={()=>handleDislike({id:comment._id,dislikedBy:comment.dislikedBy,author:comment.author})} className="flex items-center text-black hover:scale-105">
                        <Image className="mr-1 h-5 w-5" src={comment.dislikedBy.includes(user._id)?dislike:no_dislike} alt='' /> {comment.dislikedBy.length}
                    </button>
                    {comment.author==user.name&& <><button onClick={()=>setEditMe((prev)=>!prev)} className="flex items-center text-red-500 hover:scale-105">
                        <Image className=" h-5 w-5" src={edit} alt='' />
                    </button>
                    <button onClick={()=>handleDelete(comment._id)} className="flex items-center text-red-500 hover:scale-105">
                        <Image className="mr-1 h-5 w-5" src={bin} alt='' />
                    </button></>}
                    <button onClick={()=>setReplyTo(prev=>!prev)} className="flex items-center text-black hover:scale-105">
                        <Image className="mr-1 h-4 w-4 hover:scale-105 transition-all" src={replyhere} alt=''/>
                    </button>
                    {!showReplies&&<div className='gap-2 text-gray-400 flex flex-row'><SlArrowDown className='my-auto' onClick={()=>setShowReplies(true)}/><p>{comments.length} Replies</p></div>}
                    {showReplies&&<div className='gap-2 text-gray-400 flex flex-row'><SlArrowUp className='my-auto' onClick={handleArrowUp}/><p>{comments.length} Replies</p></div>}

                   
                </div>
            </div>
            {replyTo&&
                <div className='ml-5 bg-white mb-1 rounded-md'>
                    <form onSubmit={handleReplyToComment}>

               
                <div className=' w-full h-6 m-1 rounded-3xl flex flex-row justify-between bg-white '>

                    <input
                    placeholder="Reply"
                    
                      value={reply}
                     onChange={(e) => setReply(e.target.value)} className='bg-transparent p-2 outline-none text-gray-900 font-semibold w-[90%]'  />
                <button className='w-5 h-5 mr-3 m-auto' type='submit'><Image src={send} alt='' className='m-auto opacity-60 hover:opacity-90'/></button>
                </div>
                </form>
                </div>
            }
            {
                showReplies&&comments.length>0&&
                <div className='ml-5 mb-2'>
                    <CommentSection comments={comments} user={user} handleLike={handleLike} handleDislike={handleDislike} handleDelete={handleDelete} handleEdit={handleEdit} id={id}/>

                </div>
            }
        </>
    )
}
