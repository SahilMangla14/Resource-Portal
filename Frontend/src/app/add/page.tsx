"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator";
import edit from '../assets/edit.svg';
import del from '../assets/delete.svg'


interface obj {
  value: string;
  label: string;
}

interface framework {
  frameworks: obj[];
  func: (arg: string) => void;
}

const coursecode = [
  {
    value: "cs201",
    label: "CS201",
  },
  {
    value: "ma628",
    label: "MA628",
  },
  {
    value: "hs201",
    label: "HS201",
  },
];

const coursename = [
    {
      value: "data structure and algorithms",
      label: "Data Structure and Algorithms",
    },
    {
      value: "fundamentals of linguistics",
      label: "Fundamental of Linguistics",
    },
    {
      value: "machine learning",
      label: "Machine Learning",
    },
  ];

const tags=[
    {
        value:"mid-sem",
        label:"Mid-Sem"
    },
    {
        value:'end-sem',
        label:'End-Sem'
    },
    {
        value:'video lectures',
        label:'Video Lectures'
    },
    
    {
        value:'audio lectures',
        label:'Audio Lectures'
    },
    {
        value:'quiz-1',
        label:'Quiz 1'
    },
    {
        value:'quiz-2',
        label:'Quiz-2'
    },
    {
        value:'quiz',
        label:'Quiz'
    },
    {
        value:'solutions',
        label:'Solutions'
    },
    {
        value:'question paper',
        label:'Question Paper'
    },
    {
        value:'notes',
        label:'Notes'
    },
    {
        value:'assignment',
        label:'Assignment'
    },
    {
        value:'lab exam',
        label:'Lab Exam'
    },
]

const add = () => {
  const [courseCode, setCourseCode] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [tagsList,setTagsList]=useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(course);
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col lg:flex-row bg-[#F4EAE0] min-w-full min-h-screen  space-x-20 pt-20 text-black">
        <div className="bg-white w-full mx-28 rounded-3xl flex flex-col p-10 shadow-2xl ">
          <div className="font-extrabold text-3xl border-b-emerald-900 border-b-4">
            Upload New Resources
          </div>
          <div className="m-3 ">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                <p className="my-auto p-3">Course Code</p>
                <Combobox
                  frameworks={coursecode}
                  func={(event) => setCourseCode(event)} 
                 
                />
              </div>

              <div className="flex flex-row">
                <p className="my-auto p-3">Course Title</p>
                <Combobox
                  frameworks={coursename}
                  func={(event) => setCourse(event)}
                />
              </div>

              <div className="flex flex-row">
                <p className="my-auto p-3">Add Tags</p>
                <Combobox
                  frameworks={tags}
                  func={(event) => setTagsList((prev)=>[...prev,event])}
                />
              </div>

              <div className="flex flex-row flex-wrap mx-5">
                {tagsList.map(item=>{
                    return (
                            <Badge variant='outline'  className="w-fit h-[70%] m-1">{item}<button className="text-gray-400 hover:text-gray-900 mx-1" onClick={()=>(setTagsList(tagsList.filter(t=>t!==item)))}>x</button></Badge>
                            )
                        })}
                 </div>

                 <p className="my-auto p-3">Description</p>
                 <Textarea placeholder="Describe here"/>


                <div className="flex flex-col md:flex-row gap-3">

                 <div className="flex flex-row gap-3 py-4 w-[50%]">
                    <p className="my-auto">Instructor</p>
                    <input type="text" className="w-[60%] border-2 border-gray-200 focus:border-gray-400 outline-none rounded-xl p-1"/>
                 </div>

                 <div className="flex flex-row gap-3 py-4 w-[25%]">
                    <p className="my-auto">Year</p>
                    <input type="text" className="w-[60%] border-2 border-gray-200 focus:border-gray-400 outline-none rounded-xl p-1"/>
                 </div>

                 <div className="flex flex-row gap-3 py-4 w-[25%]">
                    <p className="my-auto">Semester</p>
                    <input type="text" className="w-[60%] border-2 border-gray-200 focus:border-gray-400 outline-none rounded-xl p-1"/>
                 </div>
                </div>


                 
                 <Separator/>
                 <div >

                 <p className="mt-4 text-gray-700">Add Link Here</p>
                 <input type="text" className="w-full h-16 outline-dashed outline-gray-500 my-5 rounded-lg text-cyan-800 p-2"/>
                 </div>
                    
                

              <Button onSubmit={handleSubmit}>Upload</Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col  w-full">
          <div className="flex flex-col lg:flex-row justify-center items-start text-center gap-2 min-h-fit">
          <div className="w-[40%] h-full bg-slate-100 p-3 flex flex-col justify-center gap-3 rounded-xl items-center flex-wrap text-wrap">
            <p className="font-serif text-3xl opacity-80 text-shadow font-extrabold text-yellow-800">Resources Uploaded</p>
            <div className=" rounded-full w-[60%] bg-orange-300 shadow-2xl shadow-orange-300 text-white text-shadow text-wrap font-bold flex justify-center text-center items-center" style={{aspectRatio: '1 / 1'}}><p className="text-3xl">5</p></div>
            </div>

            <div className="w-[40%] h-full bg-slate-100 p-3 flex flex-col justify-center gap-3 rounded-xl items-center flex-wrap text-wrap">
            <p className="font-serif text-4xl opacity-80 text-shadow font-extrabold text-yellow-800">Rank</p>
            <div className=" rounded-full w-[60%] bg-orange-300 shadow-2xl shadow-orange-300 text-white text-shadow text-wrap font-bold flex justify-center text-center items-center" style={{aspectRatio: '1 / 1'}}><p className="text-3xl">5</p></div>
            </div>
          </div>
          <div className="bg-black max-w-fit min-h-fit m-10 flex-wrap text-wrap rounded-xl">
                <div className="bg-pink-900 flex flex-row justify-between">

                <p className="text-white bg-pink-900 text-xl font-extrabold p-2">Recent</p>
                <input className="w-[25%] bg-white rounded-3xl m-2 p-1" placeholder="Search"/>
                </div>
                <div className=" flex flex-col gap-y-0.5 bg-black">
                        <div className="flex flex-row rounded-md bg-black min-h-fit px-0.5 group">
                            <div className=" w-[15%]  text-white bg-gray-600 flex justify-center group-hover:bg-gray-800 items-center font-semibold text-center"><p className="text-white">HS452</p></div>
                            <div className="flex flex-col h-[90%] bg-white text-gray-800 group-hover:text-gray-900 p-1">
                                <p className="text-md">Course title</p>
                                <p className="text-sm text-cyan-800 hover:text-cyan-950 text-wrap">Link provided vaeukna nsbljrrghonealvjdobveafln ohevanlj hoeanvl</p>
                                <div className="opacity-0 group-hover:opacity-100 w-full mr-0 h-[5%] flex flex-row justify-end gap-5">
                                <Image src={edit} alt='' className="w-5 h-5 hover:bg-gray-100 hover:scale-105"/>
                                <Image src={del} alt='' className="h-5 w-5 hover:bg-gray-100 hover:scale-105"/>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row rounded-md bg-black min-h-fit px-0.5 group">
                            <div className=" w-[15%]  text-white bg-gray-600 flex justify-center group-hover:bg-gray-800 items-center font-semibold text-center"><p className="text-white">HS452</p></div>
                            <div className="flex flex-col h-[90%] bg-white text-gray-800 hover:text-gray-900 p-1">
                                <p className="text-md">Course title</p>
                                <p className="text-sm text-cyan-800 hover:text-cyan-950 text-wrap">Link provided vaeukna nsbljrrghonealvjdobveafln ohevanlj hoeanvl</p>
                                <div className="opacity-0 group-hover:opacity-100 w-full mr-0 h-[5%] flex flex-row justify-end gap-5">
                                <Image src={edit} alt='' className="w-5 h-5 hover:bg-gray-100 hover:scale-105"/>
                                <Image src={del} alt='' className="h-5 w-5 hover:bg-gray-100 hover:scale-105"/>

                                </div>
                            </div>
                        </div>
                        
                </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default add;

const Combobox: React.FC<framework> = ({ frameworks, func }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className='justify-between min-w-fit'
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Search"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <Command>
          <CommandInput placeholder="Search" className={value==='search'?'opacity-10':'opacity-100'}/>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  console.log(currentValue);
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  func(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-fit",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>

        </Command>
      </PopoverContent>
    </Popover>
  );
};
