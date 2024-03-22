'use client';

import { use, useEffect, useState } from 'react';
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';
import LoadingIndicator from '@/components/LoadingIndicator'
import { SectionCourseDetails } from '@/components/New/academics/course-page/section-course-details';
import { SectionCourseMetadata } from "@/components/New/academics/course-page/section-course-metadat";
import { SectionCourseComments } from "@/components/New/academics/course-page/section-course-comments";
import axios from 'axios'
axios.defaults.withCredentials = true

const u1={
    name:'Username',
    _id:'abc'
}

export default function Page({ params }: any) {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [course, setCourse] = useState({})
    const [comments, setComments] = useState([])
    const [uploader, setUploader] = useState('')
    const [user,setUser]=useState(u1);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    useEffect(() => {
        const getCourse = async () => {
            try {
                // console.log(params)
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(res.data)

                const newData = res.data.resource
                setCourse(newData)
                
                // console.log(newData.uploaded_by)
                const uploaderRes= await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`,{
                    params: {user:newData.uploaded_by},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log(uploaderRes)
                setUploader(uploaderRes.data.user.name)
            }
            catch (err) {
                console.log(err)
            }
        }

        getCourse()
    }, [])

    useEffect(() => {
        // get comments for this course
        const getComments = async () => {
            try {
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/comment/resource/${params.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                setComments(res.data.comments ? res.data.comments : [])

                const currentUser= await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`,{
                    params: {user:res.data.user},
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log("currentUser",currentUser);
                setUser(currentUser.data.user)
                
            }
            catch (err) {
                console.log(err)
            }
        }

        getComments()

    }, [])
    

    return (
        <div>
            {isPageLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >

                        <NavigationBar />
                        <SectionCourseDetails courseInfo={course} user={user}/>
                        <div className="flex justify-center text-sm">
                            <SectionCourseMetadata courseInfo={course} uploader={uploader} />
                            <SectionCourseComments commentsInfo={comments} courseInfo = {course} user={user}/>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
