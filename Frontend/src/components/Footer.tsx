import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/Icons";

const Footer = () => (
    <footer className="flex flex-col items-center font-bold justify-between px-6 py-8 bg-gradient-to-br from-cyan-500 to-blue-500 text-gray-800">
        <nav className="flex space-x-4">
            {["About", "Contact", "Terms of Service"].map((label, index) => (
                <Link className="text-sm font-medium hover:underline hover:text-gray-200 duration-300 transform" key={index} href="#">
                    {label}
                </Link>
            ))}
        </nav>
        <div className="flex space-x-4 mt-4">
            {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: TwitterIcon, label: "Twitter" },
                { Icon: InstagramIcon, label: "Instagram" },
            ].map(({ Icon, label }, index) => (
                <Link key={index} href="#">
                    <Icon className="h-6 w-6 hover:text-gray-200 duration-300 transform" />
                    <span className="sr-only">{label}</span>
                </Link>
            ))}
        </div>
    </footer>
);

export default Footer;
