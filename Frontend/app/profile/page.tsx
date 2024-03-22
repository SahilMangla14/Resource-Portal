'use client';

import { useEffect, useState } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"
import { NavigationBar } from '@/components/New/navigation-menu';
import { SectionBookmarks } from '@/components/New/profile/section-bookmarks';
import { SectionPersonalDetails } from '@/components/New/profile/section-personal-details';
import { SectionContributions } from '@/components/New/profile/section-contributions';
import {useRouter} from 'next/navigation'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const [savedResources, setSavedResources] = useState([]);
    const [contributedResources, setContributedResources] = useState([]);
    const router = useRouter();
    const [rank,setRank]=useState(0);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);

    const personalInfo = {
        name: "Sahil Mangla",
        batch: "2025",
        upvotes: "23",
        bookmarks: [
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar"
            },
        ],
        contributions: [
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
            {
                code: "MA517",
                title: "Distributed Algorithms",
                author: "Puneet Superstar",
                upvotes: "69",
            },
        ],
    };



    useEffect(() => {
        const getSavedResources = async () => {
            try{
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getSavedResources/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log("RESULT",res.data);
                setSavedResources(res.data.updatedResourceData);
                // console.log("SAVED COURSES",res.data.updatedResourceData);
            }
            catch(error){
                console.log(error)
            }
        };
        getSavedResources();
    }, []);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
              const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
              });
            //   console.log("HELLO", response.data.user);
              setUserDetails(response.data.user);
            } catch (error) {
              console.log(error);
              // Handle error if needed
              router.push('/login');
              return
            }
          };

          getUserDetails();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try{
    
            const response=await axios.get(`${process.env.BACKEND_URL}/api/v1/user/topContributors`, {
              headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            // console.log(response.data.sortedUsers)
            response.data.sortedUsers.forEach((element:any,index:number)=>{
              if(element._id===userDetails._id) setRank(index+1)
            //   console.log(element._id,userDetails._id,rank);
            })
          }catch(e){
            console.log(e)
          }
          // console.log("USER DETAILS", userDetails);
        };
    
        fetchData();
      }, [userDetails]);


    useEffect(() => {
        const getContributedResources = async () => {
            try{
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getContributedResources`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                // console.log("RESULT",res.data);
                setContributedResources(res.data.updatedResourceData);
                // console.log("CONTRIBUTED COURSES",res.data.updatedResourceData);
            }
            catch(error){
                console.log(error)
            }
        };
        getContributedResources();
    }, []);


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
                        <SectionPersonalDetails personalInfo={userDetails} rank={rank}/>
                        <div className="flex justify-center">
                            <div className="w-[45%]">
                                <SectionBookmarks bookmarks={savedResources} />
                            </div>
                            <div className="w-[45%]">
                                <SectionContributions contributions={contributedResources} />
                            </div>
                        </div>

                    </ThemeProvider>
                </>
            )}
        </div>
    );
}
