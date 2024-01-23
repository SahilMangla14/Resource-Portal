"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import SectionAvailableResources from "@/components/Home/SectionAvailableResources";
import Image from "next/image";
import crown from '../assets/crown.svg'
import star3 from '../assets/3-star-medal.svg'
import trophy from '../assets/trophy.svg'

interface Props {
  // Define your component props here
}

const Search = () => {
  return (
    <>
      <div
        className="flex flex-col h-screen bg-[#F4EAE0] text-black"
        style={{ fontFamily: "Ubuntu, sans-serif" }}
      >
        <Navbar />
        <header className="flex h-20 w-full items-center px-4 md:px-6 pt-20"></header>
        <div className="w-full px-20 rounded-3xl">
          <SearchBar placeholder="Search resources..." />
        </div>
        
        {/* search */}
        <div className='w-full py-20 md:py-10 lg:py-20 xl:py-30 bg-[#F4EAE0]'>

            <div className='flex flex-col lg:flex-row w-full '>

                <div className='flex flex-col w-[75%]'>
                <p className="text-2xl font-bold mb-4 px-20">Top Resources</p>
                <div className='grid lg:grid-cols-3 lg:grid-rows-2 gap-10 m-5 h-fit'>
                    <Blocks/>
                    <Blocks/>
                    <Blocks/>
                    <Blocks/>
                    <Blocks/>
                    <Blocks/>
                </div>
                </div>

                <div className='flex flex-col lg:w-[20%]  text-center ml-10 mr-10'>
                     <p className="text-2xl font-bold  text-center p-5 ">Top Contributors</p>
                     <div className='text-center text-wrap'>

                        <div className='grid grid-cols-3 grid-rows-6 gap-4 bg-gray-900 text-white text-center rounded-sm p-3 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
                            <div className='flex flex-row justify-around bg-pink-900 col-span-3 font-bold text-md p-2 '>
                                <p>Rank</p>
                                <p>Name</p>
                                <p>Contributions</p>
                            </div>

                            <div className='flex flex-row justify-center gap-2 m-auto'>
                            <Image src={crown} alt='' className='w-7 h-7 '></Image>
                            <p className="m-auto">1</p>
                            </div>
                            <p>bsgbagl</p>
                            <p>20</p>

                            <div className='flex flex-row justify-center gap-2 item-center m-auto'>
                            <Image src={star3} alt='' className='w-7 h-7 '></Image>
                            <p className="m-auto">2</p>
                            </div>
                            <p>abnkeaon</p>
                            <p>15</p>

                            <div className='flex flex-row justify-center gap-2 item-center m-auto'>
                            <Image src={trophy} alt='' className='w-7 h-7 '></Image>
                            <p className="m-auto">3</p>
                            </div>
                            <p>abnkeaon</p>
                            <p>15</p>

                            <p className="m-auto">4</p>
                            <p>abnkeaon</p>
                            <p>15</p>

                            
                            <p className="m-auto">5</p>
                            <p>abnkeaon</p>
                            <p>15</p>

                        </div>
                     </div>
                </div>
            </div>
        </div>

        <SectionAvailableResources />
        <Footer />
      </div>
    </>
  );
};

export default Search;

const Blocks=()=>{
    return (
        <>
           
           <div className='relative flex flex-shrink-0 group h-40 justify-center text-center overflow-hidden shadow-2xl shadow-blue-500/20  bg-[#ebd3c5] hover:ease-in hover:delay-250 hover:bg-[#8B7267] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transition-all hover:scale-110 rounded-3xl' style={{boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px'}}>
                    <div className='text-center flex flex-col transition-opacity opacity-100 focus:bg-slate-500 group-hover:opacity-5 absolute p-3 pl-10 pr-10 m-5' >

                    <p className='text-wrap'><span className='font-bold'>Course Code</span> : CS201</p>
                    <p className='text-wrap'><span className='font-bold'>Course Title</span> : Data Structures and Algorithms vabkdbbvaekd</p>
                    </div>
                    

                    <button type="button" className="text-[#2E2622] cursor-grab transition-opacity opacity-0 group-hover:opacity-100  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center   m-auto">Get Resources</button>
                   
                    
                    </div>
           
        </>
    )
}
