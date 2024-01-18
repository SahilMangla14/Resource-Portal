"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { StaticImageData } from 'next/image';
import img from '../assets/study.png'
import { useForm, SubmitHandler } from 'react-hook-form';

type Course = {
    image: StaticImageData;
    code: string;
    instructor: string;
    year: number;
    contributor: string;
    ratings: number;
    driveLink: string;
};

type Comment = {
    id: number;
    name: string;
    text: string;
    likes: number;
    dislikes: number;
};

const course: Course = {
    image: img,
    code: 'CS101',
    instructor: 'Dr. Apurav Mudgal',
    year: 2022,
    contributor: 'Prashant Mittal',
    ratings: 4.5,
    driveLink: 'https://drive.google.com',
};


const comments: Comment[] = [
    { id: 1, name: "Sahil", text: 'Kuch samajh nahi aa raha tha class mein 🥹! Thanks for this. Ab  mai pass ho jaunga 👍', likes: 10, dislikes: 0 },
    { id: 2, name: "Sahil", text: 'Ye dekh ke bhi kuch samajh nahi aaya 🥹', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad tempora ipsum omnis magnam quas, fugiat laborum dolorum facilis minus sint tempore quo odio facere cumque qui deserunt accusamus assumenda.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
    { id: 2, name: "Sahil", text: 'Very helpful.', likes: 20, dislikes: 1 },
];



export default function CoursePage() {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const { register, handleSubmit, reset } = useForm();

    interface FormData {
        name: string;
        comment: string;
    }

    const handleLike = () => setLikes(likes + 1);
    const handleDislike = () => setDislikes(dislikes + 1);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
      };


    return (
        <div className="flex flex-col md:flex-row p-4">
            <div className="w-full md:w-3/4 pr-4">
                {/* Your course details and comments list go here */}
                <div className="p-4 bg-gray-100 min-h-screen">
                    <div className="flex items-center space-x-20">
                        <div className="rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                            <Image src={course.image} alt={course.code} width={200} height={200} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-blue-700">{course.code}</h2>
                            <p className='text-black'>Instructor: {course.instructor}</p>
                            <p className='text-black'>Year: {course.year}</p>
                            <p className='text-black'>Contributor: {course.contributor}</p>
                            <p className='text-black'>Ratings: {course.ratings}</p>
                            {/* <Link href={course.driveLink}> */}
                            <a className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-500">Go to Course</a>
                            {/* </Link> */}
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-blue-700">Comments</h3>
                        {comments.map((comment) => (
                            <div key={comment.id} className="mt-4 p-4 border rounded shadow-md bg-white text-black">
                                <p><strong>{comment.name}:</strong> {comment.text}</p>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Your Name
                        </label>    
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                            Your Comment
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                            id="comment"
                            placeholder="Your Comment"
                            {...register("comment", { required: true })}
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
    );
}
