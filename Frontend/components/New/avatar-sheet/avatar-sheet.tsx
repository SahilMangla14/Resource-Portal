"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChangePasswordAlert } from "@/components/New/avatar-sheet/alert-dialog/change-password"
import { ReportIssueAlert } from "@/components/New/avatar-sheet/alert-dialog/report-issue"
import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.withCredentials = true;
import { useRouter } from "next/navigation"
import { useImage } from "@/store/image"

export function AvatarSheet() {

    const [name, setName] = useState("")
    const router = useRouter();
    const {imageUrl}=useImage();
    // console.log("imageUrl",imageUrl)

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserDetails();
            if(!user){
                router.push('/login')
                return;
            }

            setName(user.name);
        };
        fetchData();
    }, []);


    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            // console.log("HELLO", response.data.user);
            return response.data.user;
        } catch (error) {
            // console.log(error);
            // Handle error if needed
            return null;
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/logout`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // console.log(response.data);
            localStorage.removeItem('authToken');
            router.push('/login');
        } catch (error) {
            // console.log(error);
            // Handle error if needed
        }
    }


    return (
        <div>
            <Sheet key="left">
                <SheetTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={imageUrl !== "" ? imageUrl : "https://github.com/shadcn.png"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <Avatar className="w-full h-full">
                            <AvatarImage src={imageUrl !== "" ? imageUrl : "https://github.com/shadcn.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex justify-center w-full">
                            <SheetTitle className="text-2xl">{name}</SheetTitle>
                        </div>
                    </SheetHeader>
                    <div className="space-y-2 py-10 w-full">
                        <div>
                            <Button variant="outline" className="w-full text-md" onClick={() => router.push('/profile')}>
                                View Profile
                            </Button>
                        </div>
                        {/* <div>
                            <ChangePasswordAlert />
                        </div>
                        <div>
                            <ReportIssueAlert />
                        </div> */}
                        <div>
                            <Button variant="outline" className="w-full text-md" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
