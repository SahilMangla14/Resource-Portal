import Link from "next/link";
import { SchoolIcon } from "@/components/Icons";


const Navbar = () => (
    <header className="flex items-center justify-between px-6 py-3 bg-[#1A120B] bg-opacity-90 fixed top-0 w-full z-10 text-[#FAF6F0]">
        <Link href="#">
            <SchoolIcon className="h-8 w-8" />
            <span className="sr-only">University Name</span>
        </Link>
        <nav className="flex space-x-4">
            <Link className="text-sm font-medium hover:underline hover:text-gray-400" href="/results">
                Academic Resources
            </Link>
            <Link className="text-sm font-medium hover:underline hover:text-gray-400" href="/">
                Student Services
            </Link>
            <Link className="text-sm font-medium hover:underline hover:text-gray-400" href="#">
                Campus Facilities
            </Link>
            <Link className="text-sm font-medium hover:underline hover:text-gray-400" href='/login'>Log In</Link>
        </nav>
    </header>
);

export default Navbar;
