'use client';

import '@fontsource/inter/400.css';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ContributeAlert } from '@/components/New/academics/home-page/alert-dialog/contribute';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function SectionTopContributors() {

    const [topContributorsData, setTopContributorsData] = useState([]);
    useEffect(() => {

        const fetchTopContributors = async () => {
            try {
                const token = localStorage.getItem('authToken')
                const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/topContributors`, { headers: { 'Authorization': `Bearer ${token}` } });
                setTopContributorsData(res.data.sortedUsers.slice(0, 5))
                // console.log("Top Contributors", res.data.sortedUsers.slice(0, 5))   
            } catch (err) {
                console.error(err);
            }
        };

        fetchTopContributors();


    }, []);


    return (
        <>
        <div className='my-8'>

        
            <ContributeAlert label='Contribute' variant='secondary' resourceId=''/>
            <div className="flex justify-center p-6">
                <span className="text-lg font-semibold">Top Contributors</span>
            </div>
            <div className="">
                {
                    topContributorsData.map((user, index) => {
                        return (
                            <div key={index}>
                                <div className="flex items-center space-x-4 px-4 py-2">
                                    <Avatar>
                                        <AvatarImage src={user.imageUrl ? user.imageUrl : "https://github.com/shadcn.png"} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="text-xs font-xs text-muted-foreground">{user.totalLikes} Upvotes</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-4 px-4 py-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Sahil Mangla</p>
                            <p className="text-xs font-xs text-muted-foreground">69 Upvotes</p>
                        </div>
                    </div>
                </div> */}
            </div>
            </div>
        </>
    );
}
