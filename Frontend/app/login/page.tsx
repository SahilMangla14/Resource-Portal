'use client';

import { useEffect, useState } from 'react';
import { SiInformatica } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import LoadingIndicator from '@/components/LoadingIndicator'
import { ThemeProvider } from "@/components/New/theme-provider"
import GoogleLogin from "@stack-pulse/next-google-login"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios'
axios.defaults.withCredentials = true;
import { useImage } from "@/store/image";
import { useCookies } from 'react-cookie';

interface ImageData {
    setImage: (image: string) => void;
    imageUrl: string;
}

export default function Page() {
    const [isPageLoading, setIsPageLoading] = useState(true);
    const router = useRouter();
    const { setImage, imageUrl } = useImage() as ImageData;
    const [cookies, setCookie, removeCookie] = useCookies(['_auth_resource_tkn']);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);


    const notifySuccess = (message: string) => {
        toast.success(message);
    };

    const notifyError = (message: string) => {
        toast.error(message);
    }


    const responseGoogle = async (response: any) => {
        const bodyObject = {
            authId: response.tokenObj.id_token
        };
        try {
            //   if (isEmpty(response.errors)) {
            // console.log("bodyObject",bodyObject)
            // console.log("response",response.profileObj.imageUrl)

            setImage(response.profileObj.imageUrl)
            // console.log("image",imageUrl)
            const result = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/google-login`, bodyObject, {withCredentials: true});
            console.log("result",result.data.cookies.split("=")[1])
            const cookies = result.data.cookies.split("=")[1]
            console.log("cookies",cookies)
            setCookie('_auth_resource_tkn', cookies);
            localStorage.setItem('authToken', result.data.token);
            // console.log("RESULT : ", result.data.message)
            notifySuccess(result.data.message)
            router.push('/')
            //   }
        }
        catch (e: any) {
            console.log(e);
            // notifyError(e.response.data.message)
        }
    }

    return (
        <div>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >

                {isPageLoading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <div className="flex h-screen">
                            <Skeleton className="w-[50%]">
                                <div className="h-full">
                                    <div className="flex items-center p-10">
                                        <SiInformatica size={40} />
                                        <p className="ml-2 text-2xl font-bold">InfoNest</p>
                                    </div>
                                    <div className="h-[70%]"></div>
                                    <div className="px-8 font-bold text-lg">Good to see you back.</div>
                                </div>
                            </Skeleton>
                            <div className="w-[50%] flex justify-center items-center">
                                <div >
                                    <div className="text-2xl font-bold text-center">Account Sign In</div>
                                    <div className="text-md text-muted-foreground text-center py-1">Click the button below to log in to your account.</div>
                                    <div className="px-4">
                                        {/* <Button variant="outline" className="w-full">
                                            <FaGoogle size={18} className="mx-2" />
                                            Sign In with Google
                                        </Button> */}
                                        <GoogleLogin
                                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
                                            buttonText="Sign in with Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            className='w-full flex items-center justify-center my-2'
                                        >
                                        </GoogleLogin>
                                    </div>
                                    <div className="text-muted-foreground text-center py-1 text-xs">
                                        Join the <span className="font-bold">Infonest</span> community.
                                        <br /> Your one-stop solution for everything.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
            </ThemeProvider>
        </div>
    );
}
