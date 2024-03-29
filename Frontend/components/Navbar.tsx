"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SchoolIcon } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import logout from "../app/assets/logout.svg";
import profile from "../app/assets/profile.svg";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import bookmark from '../app/assets/bookmarks.svg'
import add from '../app/assets/add.svg'
import { SiInformatica } from "react-icons/si";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    entry_number: z
        .string()
        .refine(
            (value) => /^(?:\d{4}[A-Za-z]{3}\d{4})?$/.test(value),
            "Invalid Entry number"
        )
        .optional(),
    status: z.any().optional(),
});

const passwordSchema = z
    .object({
        password: z.string().refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), "Invalid password format. Must be at least 8 characters and include at least one letter, one number, and one special character.").optional(),
        confirm: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords do not match",
        path: ["confirm"],
    });

const Navbar = () => {
    const defaultAvatars = [
        "text-[#F4DF4EFF] bg-[#949398FF]",
        "text-[#584B1FF] bg-[#FC766AFF]",
        "text-[#E69A8DFF] bg-[#5F4B8BFF]",
        "text-[#00203FFF] bg-[#ADEFD1FF]",
        "text-[#2C5F2D] bg-[#97BC62FF]",
    ];

    const [color, setColor] = useState<string>("");
    const [userDetails, setUserDetails] = useState<any>({})
    const router = useRouter()

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
        setColor(defaultAvatars[randomIndex]);
    }, []);

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/getParticularUser`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
            });
            // console.log("HELLO", response.data.user);
            return response.data.user;
        } catch (error) {
            console.log(error);
            // Handle error if needed
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/login');
                return;
            }

            const data = await getUserDetails();
            setUserDetails(data);
            // console.log("USER DETAILS", userDetails);
        };

        fetchData();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            //replace with username later
            username: userDetails?.name ? userDetails.name : "Username",
            entry_number: "",
            status: "",
        },
    });

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    });

    const notifySuccess = (message: string) => {
        toast.success(message);
    };

    const notifyError = (message: string) => {
        toast.error(message);
    }

    const onAccountSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // set the token in the header from local storage
            const data = {
                name: values.username,
                entry_number: values.entry_number,
                status: values.status
            }
            const token = localStorage.getItem('authToken')
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/user/updateUser`, data, { headers: { 'Authorization': `Bearer ${token}` } })

            // console.log(res.data)
            notifySuccess(res.data.message)
        }
        catch (err: any) {
            // console.log(err)
            if (err.response.data.message === 'Unauthorized' || err.response.data.message === "No token provided") {
                // redirect to login page
                router.push('/login')
            }
            notifyError(err.response.data.message)
        }
    };

    const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
        try {
            const data = {
                password: values.password
            }
            const token = localStorage.getItem('authToken')
            const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/user/updateUser`, data, { headers: { 'Authorization': `Bearer ${token}` } })
            // console.log("Password changed successfully", res.data)
            notifySuccess("Password Updated Successfully")
        }
        catch (err: any) {
            // console.log(err)
            if (err.response.data.message === 'Unauthorized' || err.response.data.message === "No token provided") {
                // redirect to login page
                router.push('/login')
            }
            notifyError(err.response.data.message)
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
            console.log(error);
            // Handle error if needed
        }
    }

    return (
        <>
            <header className="flex items-center justify-between px-6 py-2.5 bg-gradient-to-br from-cyan-600 to-blue-600 bg-opacity-95 fixed top-0 w-full z-10 text-[#FAF6F0] shadow-lg ">
                <div className="flex items-center">
                    <SiInformatica size={30} />
                    <p className="ml-2 text-xl font-bold">InfoNest</p>
                </div>
                <nav className="flex space-x-4">
                    <Link
                        className="text-sm font-medium duration-300 tranform hover:font-bold active:scale-90 hover:underline hover:text-black m-auto hover:underline-offset-4 "
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="text-sm font-medium duration-300 tranform hover:font-bold active:scale-90 hover:underline hover:text-black m-auto hover:underline-offset-4 "
                        href="#"
                    >
                        About
                    </Link>
                    <Link
                        className="text-sm font-medium duration-300 tranform hover:font-bold active:scale-90 hover:underline hover:text-black m-auto hover:underline-offset-4 "
                        href="/login"
                    >
                        Log In
                    </Link>



                    <Sheet>
                        <SheetTrigger>
                            <Avatar>
                                <AvatarImage src="" className="w-8 h-8 rounded-full m-auto" />
                                <AvatarFallback className={color}>SB</AvatarFallback>
                            </Avatar>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-gray-950 border-black ">
                            <SheetHeader>
                                <Avatar className="m-auto w-[70%] h-auto aspect-square p-5">
                                    <AvatarImage src="" className="rounded-full m-auto " />
                                    <AvatarFallback className={`${color} text-3xl`}>
                                        SB
                                    </AvatarFallback>
                                </Avatar>
                                <SheetTitle className="m-auto text-white text-2xl">
                                    {userDetails?.name ? userDetails.name : "Username"}
                                </SheetTitle>
                                <Separator className="bg-gray-500" />
                                <SheetDescription className="p-8">
                                    <div className="flex flex-col ">
                                        <Link href="/add">
                                            <div className="flex flex-row p-3 hover:scale-105 opacity-80 hover:opacity-100 hover:cursor-grab">
                                                <Image
                                                    src={add}
                                                    alt=""
                                                    className="w-8 h-8"
                                                />
                                                <p className="m-auto font-bold text-lg text-gray-100 ">
                                                    Add Resources
                                                </p>
                                            </div>
                                        </Link>

                                        <Separator className="bg-gray-700" />

                                        <Dialog>
                                            <DialogTrigger>
                                                <div className="flex flex-row p-3 hover:scale-105 opacity-80 hover:opacity-100 hover:cursor-grab ">
                                                    <Image src={profile} alt="" className="w-8 h-8" />
                                                    <p className="m-auto font-bold text-lg text-gray-100 ">
                                                        Profile
                                                    </p>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent>
                                                {/* <DialogHeader> */}
                                                {/* <DialogDescription> */}
                                                <DialogTitle className="text-black">Edit Profile</DialogTitle>
                                                <Tabs defaultValue="account" className="w-[400px]">
                                                    <TabsList className="w-full">
                                                        <TabsTrigger value="account" className="w-[50%]">
                                                            Account
                                                        </TabsTrigger>
                                                        <TabsTrigger value="password" className="w-[50%]">
                                                            Password
                                                        </TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent value="account">
                                                        <p className="text-sm text-gray-500 p-3">
                                                            Make changes to your account here. Click save when
                                                            you're done.
                                                        </p>

                                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onAccountSubmit)} className="text-black">
                                                                <FormField
                                                                    control={form.control}
                                                                    name="username"
                                                                    render={({ field }) => (
                                                                        <FormItem className="p-1">
                                                                            <FormLabel className="text-black">Username</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="Username"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormDescription>
                                                                                This is your public display name.
                                                                            </FormDescription>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="entry_number"
                                                                    render={({ field }) => (
                                                                        <FormItem className="p-1">
                                                                            <FormLabel className="text-black">Entry Number</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="20--ABC1234"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="status"
                                                                    render={({ field }) => (
                                                                        <FormItem className="p-1">
                                                                            <FormLabel className="text-black">Status</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    placeholder="Type anything"
                                                                                    {...field}
                                                                                />
                                                                            </FormControl>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <Button type="submit" className="mt-3">
                                                                    Submit
                                                                </Button>
                                                            </form>
                                                        </Form>
                                                    </TabsContent>

                                                    <TabsContent value="password">
                                                        <p className="text-sm text-gray-500 p-3">
                                                            Change your password here.
                                                        </p>
                                                        <Form {...passwordForm}>
                                                            <form
                                                                onSubmit={passwordForm.handleSubmit(
                                                                    onPasswordSubmit
                                                                )}
                                                                className="text-black"
                                                            >
                                                                <FormField
                                                                    control={passwordForm.control}
                                                                    name="password"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-black">Enter new Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="Password" {...field} type="password" />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={passwordForm.control}
                                                                    name="confirm"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-black">Confirm Password</FormLabel>
                                                                            <FormControl>
                                                                                <Input placeholder="" {...field} type="password" />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <Button type="submit" className="mt-3">Change Password</Button>
                                                            </form>
                                                        </Form>
                                                    </TabsContent>
                                                </Tabs>

                                            </DialogContent>
                                        </Dialog>

                                        <Separator className="bg-gray-700" />
                                        <Link href='/saved'>

                                            <div className="flex flex-row p-3 hover:scale-105  opacity-80 hover:opacity-100 hover:cursor-grab ">
                                                <Image src={bookmark} alt="" className=" w-8 h-8" />
                                                <p className="m-auto font-bold text-lg text-gray-100 ">
                                                    Saved
                                                </p>
                                            </div>
                                        </Link>

                                        <Separator className="bg-gray-700" />
                                        <button onClick={handleLogout}>
                                            <div className="flex flex-row p-3 hover:scale-105  opacity-80 hover:opacity-100 hover:cursor-grab">
                                                <Image src={logout} alt="" className=" w-8 h-8 " />
                                                <p className="m-auto font-bold text-lg text-gray-100 ">
                                                    Log out
                                                </p>
                                            </div>
                                        </button>

                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </nav>
            </header>
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
};

export default Navbar;
