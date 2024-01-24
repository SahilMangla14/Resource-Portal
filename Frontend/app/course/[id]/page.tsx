"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { StaticImageData } from 'next/image';
import img from '../../assets/study.png'
import axios from 'axios'
import { get } from 'http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Course = {
    image: StaticImageData;
    courseCode: string;
    instructor: string;
    year: number;
    uploaded_by: string;
    likes: number;
    link: string;
};

type Comment = {
    _id: string;
    author: string;
    text: string;
    likes: number;
    dislikes: number;
};

const InitialCourse = {
    image: img,
    courseCode: 'COURSE CODE',
    instructor: 'INSTRUCTOR',
    year: "YEAR",
    uploaded_by: 'XYZ',
    likes: "LIKES",
    link: 'https://drive.google.com',
};


// const comments: Comment[] = [
//     { id: 1, name: "Sahil", text: 'Kuch samajh nahi aa raha tha class mein 🥹! Thanks for this. Ab  mai pass ho jaunga 👍', likes: 10, dislikes: 0 },
//     { id: 2, name: "Sahil", text: 'Ye dekh ke bhi kuch samajh nahi aaya 🥹', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
//     { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
// ];



export default function CoursePage({ params }: any) {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState<Comment[]>([])
    const [course, setCourse] = useState<Course>(InitialCourse)
    // const {register, handleSubmit, reset } = useForm();


    const [commentValue, setCommentValue] = useState('')

    // console.log(params.id)


    const handleLike = () => setLikes(likes + 1);
    const handleDislike = () => setDislikes(dislikes + 1);

    const notifySuccess = (message: string) => {
        toast.success(message);
    };

    const notifyError = (message: string) => {
        toast.error(message);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            // console.log(commentValue)
            const token = localStorage.getItem('authToken')
            const res = await axios.post('http://localhost:5000/api/v1/comment/create', { text: commentValue, course_id: params.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)

            notifySuccess('Comment added successfully')

            const updatedCommentsRes = await axios.get(`http://localhost:5000/api/v1/comment/resource/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            // console.log(updatedCommentsRes.data);
            setComments(updatedCommentsRes.data.comments);

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
                const res = await axios.get(`http://localhost:5000/api/v1/comment/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)
                setComments(res.data.comments)
            }
            catch (err) {
                console.log(err)
            }
        }

        getComments()

    }, [])


    // setCourse from backend
    useEffect(() => {
        const getCourse = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)

                const newData = res.data.resource
                newData.image = img
                setCourse(newData)
            }
            catch (err) {
                console.log(err)
            }
        }

        getCourse()
    }, [])





    return (
        <>
            <div className="flex flex-col md:flex-row p-4">
                <div className="w-full md:w-3/4 pr-4">
                    {/* Your course details and comments list go here */}
                    <div className="p-4 bg-gray-100 min-h-screen">
                        <div className="flex items-center space-x-20">
                            <div className="rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                                <Image src={course.image} alt={course.courseCode} width={200} height={200} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-blue-700">{course.courseCode}</h2>
                                <p className='text-black'>Instructor: {course.instructor}</p>
                                <p className='text-black'>Year: {course.year}</p>
                                <p className='text-black'>Contributor: {course.uploaded_by}</p>
                                <p className='text-black'>Ratings: {course.likes}</p>
                                {/* <Link href={course.driveLink}> */}
                                <a className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-500" href={course.link}>Go to Course</a>
                                {/* </Link> */}
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-xl font-bold text-blue-700">Comments</h3>
                            {comments && comments.map((comment) => (
                                <div key={comment._id} className="mt-4 p-4 border rounded shadow-md bg-white text-black">
                                    <p><strong>{comment.author}:</strong> {comment.text}</p>
                                    <div className="mt-2 flex items-center space-x-2">
                                        <button onClick={handleLike} className="flex items-center text-green-500">
                                            <FaThumbsUp className="mr-1" /> Like ({comment.likes})
                                        </button>
                                        <button onClick={handleDislike} className="flex items-center text-red-500">
                                            <FaThumbsDown className="mr-1" /> Dislike ({comment.dislikes})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/4 sticky top-0 h-full md:h-screen bg-gray-100 p-4">
                    <h3 className="text-xl font-bold text-blue-700 mb-4">Add a Comment</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                                Your Comment
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                                id="comment"
                                placeholder="Your Comment"
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Submit Comment
                            </button>
                        </div>
                    </form>
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
