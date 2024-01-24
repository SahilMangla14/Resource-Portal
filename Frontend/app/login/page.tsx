"use client"

import {use, useEffect, useRef,useState} from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import resimg from '../assets/resource-image.avif'
import tick from '../assets/tick.png'
import user from '../assets/user.png'
import study from '../assets/study.png'
import mail from '../assets/mail.png'
import lock from '../assets/padlock.png'
import google from '../assets/google.png'
import reset from '../assets/reset.webp'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
axios.defaults.withCredentials = true;

const Login = () => {
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const resetPasswordEmailRef=useRef<HTMLInputElement>(null);
    const router=useRouter()
    const [error,setError]=useState<string>('');
    const [emailStatus,setEmailStatus]=useState<boolean>(false);
    const [passwordStatus,setPasswordStatus]=useState<{status:boolean,message:string}>({status:false,message:''});
    const [loading,setLoading]=useState<boolean>(false);
    const [resetPasswordMode, setResetPasswordMode] = useState<boolean>(false);

    const [resetPasswordError, setResetPasswordError] = useState('');



    const notifySuccess = (message:string) => {
        toast.success(message);
      };

    const notifyError=(message:string)=>{
      toast.error(message);
    }

      const handleForgotPassword = async () => {
        try {
          //reset password

          setResetPasswordMode(false);
          setResetPasswordError('');
          notifySuccess('A password reset email has been sent to your email address.');
        } catch (error) {
          notifyError('Failed to send reset password email. Please try again.');
        }
      };

      const handleGoogleSignup=()=>{
        //google signup
      }

    const handleLogin=async(e:React.FormEvent)=>{
      e.preventDefault();

      const email=emailRef.current?.value;
      const password=passwordRef.current?.value||'';

      if(!/@iitrpr\.ac\.in$/.test(emailRef.current?.value||'')){
        setEmailStatus(true);
        return;
      }

      if(password.length<8){
        setPasswordStatus({
          status:true,
          message:'Your password should be at least 8 characters long'
        })
        return;
      }
      if(!/[A-Z]/.test(password)||!/[a-z]/.test(password)||!/\d/.test(password)||!/[!@#$%^&*]/.test(password)){
        setPasswordStatus({
          status:true,
          message:'Your password should be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters'
        })
        return;
      }

      try {
          setError('');
          setLoading(true);
          if (resetPasswordMode) {
            await handleForgotPassword();
          }
          else {
            // console.log("EMAIL ", email, " PASSWORD ", password);

              //login
              const res = await axios.post(`${process.env.BACKEND_URL}/api/v1/user/login`, {
                email,
                password,
              });

              // console.log(res.data);

              // store token in local storage
              localStorage.setItem('authToken', res.data.token);

              notifySuccess(res.data.message)
              router.push('/')
          }
        } catch(error: any) {
            // console.log(error)
            // notifyError(error)
            setError(error.message);
            notifyError(error.response.data.message)
        }
        setLoading(false);
    }

  return (
    <>

        {!resetPasswordMode&&<div className="flex bg-white text-black fixed top-0 bottom-0 right-0 left-0">
            <div className=' w-6/12 hidden sm:block m-auto mt-[15vh] '>
                <Image src={study} className=''  alt="" />
            </div>
            <div className='flex flex-col justify-center m-auto' >

               <div className='md:w-[30vw] md:h-[max-content] flex flex-col rounded-lg border-2 border-grey p-10' style={{boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'}}>
               <form onSubmit={handleLogin} className='flex flex-col'>
               <h1 className='text-center font-bold text-5xl m-8'>Log In</h1>
                {error&&<p className="text-red-600 mt-2 mb-2">{error}</p>}

                <div className={`border-[1.5px] p-2 rounded-md divide-x flex  mb-2 ${!emailStatus?'':'bg-red-100'}`}>
                  <Image src={mail} alt="" className="w-6 m-1"  />
                  <input type="email" name='email' ref={emailRef} placeholder='Email Id' className={!emailStatus?"w-[100%] pl-2 outline-none":"w-[100%] pl-2 outline-none bg-red-100"} onChange={()=>setEmailStatus(false)}/>
                 </div>
                  {emailStatus&&<p className="text-red-600 mb-2">Please use institute email id</p>}

                <div className={`border-[1.5px] p-2 rounded-md divide-x flex  mb-2 ${!passwordStatus.status?'':'bg-red-100'}`}>
                <Image src={lock} className="w-6 m-1" alt="" />
                  <input type="password" name='password' ref={passwordRef} placeholder='Password'  className={!passwordStatus.status?"w-[100%] pl-2 outline-none":"w-[100%] pl-2 outline-none bg-red-100"} onChange={()=>setPasswordStatus({status:false,message:''})}/>
                </div>
                {passwordStatus.status&&<p className="text-red-600 mb-2">{passwordStatus.message}</p>}

                <button disabled={loading} className='bg-[#BA988A] p-2 mt-2 mb-2 rounded-md text-[white] hover:bg-[#5D4C45]'>Log In</button>
                </form>
                {/* <div className='flex flex-col mt-3 mb-2'> */}
                <div className='text-right'><button className='outline-none text-[#5D4C45] cursor-pointer hover:text-[#171311]' onClick={()=>setResetPasswordMode(true)}>Forgot Password</button></div>
                {/* </div> */}
                <p className="text-center border-b-2 leading-[0.1em] mt-4"><span className='bg-[white] pl-2 pr-2'>or</span></p>

                <button onClick={handleGoogleSignup} className=' p-2 mb-2 rounded-md border-[1.5px] border-slate-200 mt-6 hover:bg-slate-200 flex justify-center' ><Image src={google} alt="" className='w-6 mr-4'/> Log In with Google</button>
                <div className='mt-8 text-center'><span>Create a new account </span><button className='text-red-900 cursor-pointer hover:text-red-600' onClick={()=>router.push('/signup')}>Register</button></div>
               </div>

            </div>
        </div>

        }

        {resetPasswordMode&&<div className='bg-white fixed top-0 bottom-0 left-0 right-0'><div className="flex justify-center flex-col m-auto md:w-[50vw] h-[auto] text-center mt-[10vh] bg-white text-black ">
                <Image src={reset} alt="" className='w-3/12 m-auto'/>
                <span className='font-serif text-5xl mb-6'>Reset Your Password</span>
                <p className='text-lg'>Forgot your password? Fear Not. We'll email you instructions to reset your password.</p>
                <div className='mt-10 p-2 flex flex-col m-auto md:w-[28vw]'>
                <label className='text-left font-bold mb-2' htmlFor='email'>Email Address</label>
                <input type="text" className="w-[100%] border-[1.2px] border-black outline-none p-1" name="email" id="email" ref={resetPasswordEmailRef}/>
                <div className='flex justify-between mt-5 md:flex-row flex-col'>
                    <button onClick={handleForgotPassword} className=" bg-yellow-500 text-white p-2 text-md hover:bg-yellow-600">Reset Password</button>
                    <button onClick={()=>setResetPasswordMode(false)} className='text-yellow-800 hover:text-yellow-700'>Return to Login</button>
                </div>

                </div>
            </div></div>}


            <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>

    </>
  )
}

export default Login


