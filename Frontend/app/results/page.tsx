import Navbar from "@/components/Navbar"
import SearchBar from "@/components/SearchBar"
import Link from "next/link"


export default async function Component() {


  return (
    <div className="flex flex-col h-screen bg-[#F4EAE0] text-black" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
        <Navbar />
      <header className="flex h-20 w-full items-center px-4 md:px-6">
      </header>
      <div className="w-full px-10">
        <SearchBar placeholder="Search resources..." />
      </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Showing results for "Item"</h1>
        <div className="grid gap-0">
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
            {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#3E3232] hover:bg-[#8D7B68] focus:ring-4 focus:outline-none focus:ring-[#C8B6A6] font-medium rounded-lg text-sm px-4 py-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
            {/* </button> */}
              {/* </Button> */}
              {/* <Button> */}
              {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#3E3232] hover:bg-[#8D7B68] focus:ring-4 focus:outline-none focus:ring-[#C8B6A6] font-medium rounded-lg text-sm px-4 py-2"> */}

                <ArrowDownIcon className="h-6 w-6" />
                {/* </button> */}
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">100</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">Example</h2>
              <p className="text-sm text-gray-500">https://www.example.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by John Doe</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #example
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag1
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag2
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">200</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">Google</h2>
              <p className="text-sm text-gray-500">https://www.google.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Jane Smith</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #google
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #search
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag2
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
          <Link
            className="flex items-start p-4 border rounded-md hover:bg-gray-100 transition-colors bg-gray-50"
            href="#"
          >
            <div className="flex flex-col items-center mr-4">
              {/* <Button className="mb-2"> */}
                <ArrowUpIcon className="h-6 w-6" />
              {/* </Button> */}
              {/* <Button> */}
                <ArrowDownIcon className="h-6 w-6" />
              {/* </Button> */}
            </div>
            <div className="flex items-center mr-4">
              <span className="text-lg font-semibold">300</span>
              <span className="text-sm text-gray-500 ml-2">upvotes</span>
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-1">GitHub</h2>
              <p className="text-sm text-gray-500">https://www.github.com</p>
              <p className="text-sm text-gray-500 mt-2">Posted by Alex Johnson</p>
            </div>
            <div className="ml-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #github
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #code
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                #tag3
              </span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

function ArrowDownIcon(props) {
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


function ArrowUpIcon(props) {
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


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
