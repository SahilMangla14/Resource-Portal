"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import axios from 'axios'

interface Course {
  _id: string;
  courseCode: string;
  courseTitle: string;
  courseDescription: string;
  uploadedBy: string;
  tags: string[];
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <Link href={`/course/${course._id}`}>
  <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-4">
    <div className="bg-blue-50 dark:bg-gray-800 w-full block h-full">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{course.courseCode}</h2>
        <h3 className="text-md text-gray-600 dark:text-gray-200 font-semibold mb-2">{course.courseTitle}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 my-3">{course.courseDescription}</p>
        <div className="flex flex-wrap justify-starts items-center mt-4">
          <div className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-200 rounded-2xl mb-2">
            {`Uploaded by: ${course.uploadedBy}`}
          </div>
          {course.tags.map((tag, index) => (
            <div key={index} className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-green-200 rounded-2xl mb-2">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-3 bg-gray-100 border-t border-blue-200 h-10">
        {/* <Link href={`/course/${course._id}`}> */}
        {/* <a className="text-blue-500 inline-flex items-center">Go to Course</a> */}
        {/* </Link> */}
      </div>
    </div>
  </div>
  </Link>
);

const SavedCoursesPage: React.FC = () => {
  // const courses: Course[] = [
  //   {
  //     _id: '1',
  //     courseCode: 'CS101',
  //     courseTitle: 'Introduction to Computer Science',
  //     courseDescription: 'This course introduces the basics of computer science.',
  //     uploadedBy: 'John Doe',
  //     tags: ['CS', 'Intro', 'Basics'],
  //   },
  //   {
  //     _id: '2',
  //     courseCode: 'CS102',
  //     courseTitle: 'Data Structures and Algorithms',
  //     courseDescription: 'This course introduces various data structures and algorithms.',
  //     uploadedBy: 'Jane Doe',
  //     tags: ['CS', 'Data Structures', 'Algorithms'],
  //   },
  //   // Add more courses as needed
  //   {
  //     _id: '1',
  //     courseCode: 'CS101',
  //     courseTitle: 'Introduction to Computer Science',
  //     courseDescription: 'This course introduces the basics of computer science.',
  //     uploadedBy: 'John Doe',
  //     tags: ['CS', 'Intro', 'Basics'],
  //   },
  //   {
  //     _id: '2',
  //     courseCode: 'CS102',
  //     courseTitle: 'Data Structures and Algorithms',
  //     courseDescription: 'This course introduces various data structures and algorithms.',
  //     uploadedBy: 'Jane Doe',
  //     tags: ['CS', 'Data Structures', 'Algorithms'],
  //   },
  //   // Add more courses as needed
  //   {
  //     _id: '1',
  //     courseCode: 'CS101',
  //     courseTitle: 'Introduction to Computer Science',
  //     courseDescription: 'This course introduces the basics of computer science.',
  //     uploadedBy: 'John Doe',
  //     tags: ['CS', 'Intro', 'Basics'],
  //   },
  //   {
  //     _id: '2',
  //     courseCode: 'CS102',
  //     courseTitle: 'Data Structures and Algorithms',
  //     courseDescription: 'This course introduces various data structures and algorithms.',
  //     uploadedBy: 'Jane Doe',
  //     tags: ['CS', 'Data Structures', 'Algorithms'],
  //   },
  //   // Add more courses as needed
  //   {
  //     _id: '1',
  //     courseCode: 'CS101',
  //     courseTitle: 'Introduction to Computer Science',
  //     courseDescription: 'This course introduces the basics of computer science.',
  //     uploadedBy: 'John Doe',
  //     tags: ['CS', 'Intro', 'Basics'],
  //   },
  //   {
  //     _id: '2',
  //     courseCode: 'CS102',
  //     courseTitle: 'Data Structures and Algorithms',
  //     courseDescription: 'This course introduces various data structures and algorithms.',
  //     uploadedBy: 'Jane Doe',
  //     tags: ['CS', 'Data Structures', 'Algorithms'],
  //   },
  //   // Add more courses as needed
  //   {
  //     _id: '1',
  //     courseCode: 'CS101',
  //     courseTitle: 'Introduction to Computer Science',
  //     courseDescription: 'This course introduces the basics of computer science.',
  //     uploadedBy: 'John Doe',
  //     tags: ['CS', 'Intro', 'Basics'],
  //   },
  //   {
  //     _id: '2',
  //     courseCode: 'CS102',
  //     courseTitle: 'Data Structures and Algorithms',
  //     courseDescription: 'This course introduces various data structures and algorithms.',
  //     uploadedBy: 'Jane Doe',
  //     tags: ['CS', 'Data Structures', 'Algorithms'],
  //   },
  //   // Add more courses as needed
  // ];


  // get all savedResources from the database

  const [courses, setCourses] = React.useState<Course[]>([]);

  useEffect(() => {
    const getSavedResources = async () => {

      const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getSavedResources/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      // console.log("RESULT",res.data);
      setCourses(res.data.updatedResourceData);
      // console.log("COURSES",courses);
    };
    getSavedResources();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20">
        <div className="flex flex-wrap justify-center">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SavedCoursesPage;