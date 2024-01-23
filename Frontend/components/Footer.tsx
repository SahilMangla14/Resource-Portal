import Link from "next/link";
import { FiFacebook, FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md"

const Footer = () => (
    <footer className="flex flex-col items-center justify-between px-6 py-8 bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg">
        <div className="flex space-x-4">
            {[
                { Icon: FiFacebook, label: "Facebook" },
                { Icon: FiTwitter, label: "Twitter" },
                { Icon: FaInstagram, label: "Instagram" },
            ].map(({ Icon, label }, index) => (
                <Link key={index} href="#">
                    <Icon className="h-6 w-6 hover:text-black duration-300 transform active:scale-90" />
                    <span className="sr-only">{label}</span>
                </Link>
            ))}
        </div>
        <p className="text-white mt-4">© 2024 Aarohan. All rights reserved.</p>
                    <div className="mt-4 text-white text-left w-full text-sm">
                        <p>Contact us:</p>
                        <p style={{ display: 'flex', alignItems: 'center' }}><HiOutlineMail size={16} className="inline mr-1" /> contact@infonest.com</p>
                        <p style={{ display: 'flex', alignItems: 'center' }}><MdOutlinePhone size={16} className="inline mr-1" /> +91 123 456 7890</p>
                    </div>
    </footer>
);

export default Footer;
