"use client";

import React, { useState, useEffect, use } from "react";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
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
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import crown from '../assets/crown.svg'
import star3 from '../assets/3-star-medal.svg'
import trophy from '../assets/trophy.svg'
import Link from "next/link"
import LoadingIndicator from "@/components/LoadingIndicator";
import axios from 'axios'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from 'next/navigation';

interface filterprop {
  label: string,
  func: (arg1: boolean, arg2: string) => void;
}


interface obj {
  value: string;
  label: string;
}

interface framework {
  frameworks: obj[];
  func: (arg: string) => void;
}

interface topContributors {
  name: string,
  contributedResources: string[]
}

interface results {
  _id: string,
  courseCode: string,
  courseTitle: string,
  year: string,
  semester: string,
  link: string,
  tags: string[],
  likes: number,
  uploaded_by: string,
  handleLikes:({_id,likes}:{_id:string,likes:number})=>void
}

interface BlocksProps {
  _id: string,
  courseCode: string;
  courseTitle: string;
}


const tags = [
  "mid-sem", "end-sem", "video lectures", "audio lectures", "quiz-1", "quiz-2", "quiz", "solutions", "question paper", "notes", "assignment", "lab exam",
];

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

// const result = [
//   {
//     courseCode: "cs201",
//     courseTitle: 'data structure and algorithms',
//     year: '2024',
//     semester: '1',
//     link: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat suscipit maxime nostrum ea dolores qui. Ipsam, assumenda? Earum obcaecati quidem itaque illo tempore vitae soluta aliquid quis autem ullam?',
//     tags: ['mid-sem', 'question paper', 'solutions'],
//     likes: 5,
//     uploaded_by: 'Prashant Mittal'
//   },
//   {
//     courseCode: "cs201",
//     courseTitle: 'data structure and algorithms',
//     year: '2024',
//     semester: '1',
//     link: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat suscipit maxime nostrum ea dolores qui. Ipsam, assumenda? Earum obcaecati quidem itaque illo tempore vitae soluta aliquid quis autem ullam?',
//     tags: ['mid-sem', 'question paper', 'solutions'],
//     likes: 5,
//     uploaded_by: 'Prashant Mittal'
//   },
//   {
//     courseCode: "cs201",
//     courseTitle: 'data structure and algorithms',
//     year: '2024',
//     semester: '1',
//     link: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat suscipit maxime nostrum ea dolores qui. Ipsam, assumenda? Earum obcaecati quidem itaque illo tempore vitae soluta aliquid quis autem ullam?',
//     tags: ['mid-sem', 'question paper', 'solutions'],
//     likes: 5,
//     uploaded_by: 'Prashant Mittal'
//   },
//   {
//     courseCode: "cs201",
//     courseTitle: 'data structure and algorithms',
//     year: '2024',
//     semester: '1',
//     link: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat suscipit maxime nostrum ea dolores qui. Ipsam, assumenda? Earum obcaecati quidem itaque illo tempore vitae soluta aliquid quis autem ullam?',
//     tags: ['mid-sem', 'question paper', 'solutions'],
//     likes: 5,
//     uploaded_by: 'Prashant Mittal'
//   },
//   {
//     courseCode: "cs201",
//     courseTitle: 'data structure and algorithms',
//     year: '2024',
//     semester: '1',
//     link: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora fugiat suscipit maxime nostrum ea dolores qui. Ipsam, assumenda? Earum obcaecati quidem itaque illo tempore vitae soluta aliquid quis autem ullam?',
//     tags: ['mid-sem', 'question paper', 'solutions'],
//     likes: 5,
//     uploaded_by: 'Prashant Mittal'
//   },
// ]


const page = ({params}:any) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [semesterFilter, setSemesterFilter] = useState<string>("");
  const [courseCode, setCourseCode] = useState<string>("");
  const [course, setCourse] = useState<string>("");
  const [found, setFound] = useState<boolean>(false)
  const [year, setYear] = useState<string>("");
  const [result, setResult] = useState<results[]>([])
  const [topContributorsData, setTopContributorsData] = useState<topContributors[]>([])
  const [topResources, setTopResources] = useState<results[]>([])
  const [render,setRender]=useState<boolean>(false)

  const router = useRouter()


  const handleTags = (arg1: boolean, arg2: string) => {
    if (arg1 === true) {
      setFilters((prev) => [...prev, arg2])
    }
    else {
      setFilters((prev) => prev.filter((item) => item !== arg2))
    }
  }

  const handleSemesterTag = (value: string) => {
    // console.log("VALUE", value)
    setSemesterFilter(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filters.length > 0 || courseCode !== "" || course !== "" || year !== "" || semesterFilter !== "") {
          setFound(true);
          const data = {
            tags: filters.length > 0 ? filters : undefined,
            courseCode: courseCode !== "" ? courseCode : undefined,
            courseTitle: course !== "" ? course : undefined,
            year: year !== "" ? year : undefined,
            semester: semesterFilter !== "" ? semesterFilter : undefined
          };

          // console.log("DATA", data);
          const token = localStorage.getItem('authToken')
          const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/resource/filterResources`, { params: data, headers: { 'Authorization': `Bearer ${token}` } });
          // console.log(res.data);
          setResult(res.data.resources)
        } else {
          setFound(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    // console.log("SET FOUND", found)
    // console.log("filters", filters);
    // console.log("courseCode", courseCode);
    // console.log("course", course);
    // console.log("year", year);
    // console.log("semesterFilter", semesterFilter);

  }, [filters, courseCode, course, year, semesterFilter,render]);


  useEffect(() => {
    const fetchTopContributors = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/topContributors`, { headers: { 'Authorization': `Bearer ${token}` } });
        // console.log("TOP CONTRIBUTORS", res.data);
        setTopContributorsData(res.data.sortedUsers.slice(0,5))
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopContributors();

  }, []);


  useEffect(() => {
    const fetchTopResources = async () => {
      try {
        const token = localStorage.getItem('authToken')
        let k = 6
        const res = await axios.get(`${process.env.BACKEND_URL}/api/v1/resource/top/${k}`  , { headers: { 'Authorization': `Bearer ${token}` } });
        // console.log(res.data);
        setTopResources(res.data.resources)
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopResources();

  }, []);

  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleLikes=async ({_id,likes}:{_id:string,likes:number})=>{
  try{

    const token = localStorage.getItem('authToken')
    const res = await axios.put(`${process.env.BACKEND_URL}/api/v1/resource/update/${_id}`  ,{likes:likes}, { headers: { 'Authorization': `Bearer ${token}` } });
    setRender((prev)=>!prev)
  }catch (err) {
    console.error(err);
  }
  }


  return (

    <div>
      {isPageLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div
            className="flex flex-col h-screen w-screen bg-[#F4EAE0] text-black"
            style={{ fontFamily: "Ubuntu, sans-serif" }}
          >
            <Navbar />

            <div className="flex flex-row gap-3 w-screen h-full bg-[#F4EAE0] mt-16">
              <div className="flex flex-col bg-gray-800 shadow-xl shadow-gray-900 lg:w-[12%] w-[25%] h-full">
                <div className="text-white">
                  <p className="text-white px-5 font-bold mt-5 bg-gray-950">Semester</p>
                  <div className="flex flex-row gap-2 justify-around">
                    {/* <ToggleButton label="1" func={handleTags} />
                    <ToggleButton label="2" func={handleTags} /> */}
                    <RadioGroup defaultValue="" className="flex" onValueChange={handleSemesterTag}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="option-one" className="bg-white" />
                        <Label htmlFor="option-one">1</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="option-two" className="bg-white" />
                        <Label htmlFor="option-two">2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="option-three" className="bg-white" />
                        <Label htmlFor="option-three">None</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator />

                  <p className="text-white px-5 font-bold my-5 bg-gray-950">Tags</p>
                  <div className="grid grid-col-2 gap-2">
                    {tags.map((tag,index) => (<ToggleButton label={tag} key={index} func={handleTags} />))}
                  </div>

                </div>
              </div>


              {/* second half */}

              <div className="flex  flex-col  w-[87%] h-full gap-3">

                {/* searchbar */}
                <div className="flex flex-col md:flex-row mx-10 py-3 px-5 justify-between bg-white mt-2 rounded-2xl">

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

                  <div className="flex flex-row gap-3 w-[15%]">
                    <p className="my-auto ">Year</p>
                    <input
                      type="text"
                      className="w-full md:w-[60%] text-center border-2 border-gray-200 focus:border-gray-400 outline-none rounded-xl"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>
                {/* first part */}

                <div className="flex flex-col lg:flex-row w-full h-screen overflow-scroll ">


                  <div className="flex flex-row min-w-fit lg:min-w-[74%] lg:w-[75%] h-full ">


                    {/* results */}

                    {/* default */}
                    {!found && <>
                      <div className='flex flex-col  w-full '>

                        <p className="text-2xl font-bold my-8 px-20 ">Top Resources</p>
                        <div className='flex flex-col lg:grid lg:grid-cols-3 lg:grid-row-2 gap-8 m-5 h-full overflow-scroll' >
                          {/* <Blocks />
                          <Blocks />
                          <Blocks />
                          <Blocks />
                          <Blocks />
                          <Blocks /> */}
                          {topResources.map((res) => (
                            <Blocks key={res._id} _id={res._id} courseCode={res.courseCode} courseTitle={res.courseTitle} />
                          ))}


                        </div>

                      </div>
                    </>}

                    {found && <>
                      <div className='flex flex-col  w-full '>
                        <p className="text-2xl font-bold my-8 px-20 ">Results</p>
                        <div className='flex flex-col gap-0 m-5 h-full overflow-scroll' >
                          {result&&result.map((res) => (
                            <FoundResult key={res._id}  _id={res._id} handleLikes={handleLikes} courseCode={res.courseCode} courseTitle={res.courseTitle} link={res.link} year={res.year} semester={res.semester} likes={res.likes} tags={res.tags} uploaded_by={res.uploaded_by} />
                          ))}
                        </div>
                      </div>
                    </>}


                  </div>

                  {/* second part */}
                  {/* <Separator/> */}

                  <div className="min-w-fit lg:w-[25%] h-full ">
                    <div className='flex flex-col justify-center items-center mt-20  text-center lg:mx-10 '>
                      <p className="text-2xl font-bold  text-center p-5 ">Top Contributors</p>
                      <div className='text-center text-wrap'>

                        <div className='grid grid-cols-3 grid-rows-6 gap-4 bg-gray-900 text-white text-center rounded-sm p-3 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
                          <div className='flex flex-row justify-around bg-pink-900 col-span-3 font-bold text-md p-2'>
                            <p className="mx-2">Rank</p>
                            <p className="mx-2">Name</p>
                            <p className="mx-2">Contributions</p>
                          </div>


                            {topContributorsData.map((contributor, index) => (
                            <React.Fragment key={index}>
                              <div className="flex flex-row justify-center items-center m-auto">
                                {/* Render image based on rank or use a different condition */}
                                {index === 0 && <Image src={crown} alt="" className="w-7 h-7" />}
                                {index === 1 && <Image src={star3} alt="" className="w-7 h-7" />}
                                {index === 2 && <Image src={trophy} alt="" className="w-7 h-7" />}

                                <p className="m-auto">{index + 1}</p>
                              </div>

                              <p>{contributor.name}</p>
                              <p>{contributor.contributedResources.length}</p>
                            </React.Fragment>
                          ))}


                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </div>

  );
};

const ToggleButton: React.FC<filterprop> = ({ label, func }) => {

  const [selected, setSelected] = useState<boolean>(false)

  const handleClick = () => {
    setSelected((prev) => !prev);
    func(!selected, label)
  }

  return (
    <div className="flex flex-row gap-3" onClick={handleClick}>
      <button className={`h-4 w-4 border-2 border-white m-2 rounded-full ${selected ? 'bg-white' : 'bg-transparent '}`} />
      <p className="text-white my-auto">{label}</p>
    </div>
  )
};
export default page;

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
          <CommandInput placeholder="Search" className={value === 'search' ? 'opacity-10' : 'opacity-100'} />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  // console.log(currentValue);
                  const newValue = currentValue === value ? "" : currentValue;
                  setValue(newValue);
                  setOpen(false);
                  func(newValue);
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


const Blocks: React.FC<BlocksProps> = ({_id, courseCode, courseTitle}) => {

  const router = useRouter()
  // console.log(_id)

  return (
    <>

      <div className='relative flex flex-shrink-0 group h-40 lg:h-56 justify-center text-center overflow-hidden shadow-2xl shadow-blue-500/20  bg-[#ebd3c5] hover:ease-in hover:delay-250 hover:bg-[#8B7267] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:transition-all hover:scale-110 rounded-3xl' style={{ boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px' }}>
        <div className='text-center flex flex-col transition-opacity opacity-100 focus:bg-slate-500 group-hover:opacity-5 absolute p-3 pl-10 pr-10 m-5' >

          <p className='text-wrap'><span className='font-bold'>Course Code</span> : {courseCode}</p>
          <p className='text-wrap'><span className='font-bold'>Course Title</span> : {courseTitle}</p>
        </div>


        <button type="button" className="text-[#2E2622] cursor-grab transition-opacity opacity-0 group-hover:opacity-100  bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-3xl text-sm px-5 py-2.5 text-center   m-auto" onClick={()=>{router.push(`/course/${_id}`)}}>Get Resources</button>


      </div>

    </>
  )
}

const FoundResult: React.FC<results> = ({ _id, handleLikes,courseCode, courseTitle, link, year, semester, likes, tags, uploaded_by }) => {



  return (

      <div className="flex flex-row items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50">
    
      <div className="flex flex-col items-center mr-4">
        {/* <Button className="mb-2"> */}
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#3E3232] hover:bg-[#8D7B68] focus:ring-4 focus:outline-none focus:ring-[#C8B6A6] font-medium rounded-lg text-sm px-4 py-2"> */}
        <ArrowUpIcon className="h-6 w-6 hover:scale-105 z-1" onClick={()=>handleLikes({_id,likes: likes + 1})} />
        {/* </button> */}
        {/* </Button> */}
        {/* <Button> */}
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#3E3232] hover:bg-[#8D7B68] focus:ring-4 focus:outline-none focus:ring-[#C8B6A6] font-medium rounded-lg text-sm px-4 py-2"> */}

        <ArrowDownIcon className="h-6 w-6" onClick={()=>likes>0? handleLikes({_id,likes:likes-1}):null}/>
        {/* </button> */}
        {/* </Button> */}
      </div>
      <div className="flex items-center mr-4">
        <span className="text-lg font-semibold">{likes}</span>
        <span className="text-sm text-gray-500 ml-2">upvotes</span>
      </div>
    <Link
     className="flex flex-row items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
      href={`/course/${_id}`}
    >
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-1">{courseCode} - {courseTitle} <span className="text-gray-400">{year}-{semester}</span></h2>
        <p className="text-sm text-red-950">{link}</p>
        <p className="text-sm text-gray-500 mt-2">Posted by {uploaded_by}</p>
      </div>
      <div className="ml-4 flex flex-row flex-wrap">

        {
          tags.map((tag) => (
              
            <span key={_id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          ))
        }

      </div>
    </Link>
    </div>
  )
}

function ArrowDownIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}


function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}
