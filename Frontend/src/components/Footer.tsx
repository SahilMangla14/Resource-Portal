import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "@/components/Icons";

const Footer = () => (
    <footer className="flex flex-col items-center justify-between px-6 py-4 bg-[#1A120B] text-[#FAF6F0]">
        <nav className="flex space-x-4">
            {["About", "Contact", "Terms of Service"].map((label, index) => (
                <Link className="text-sm font-medium hover:underline hover:text-gray-400" key={index} href="#">
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
                    <Icon className="h-6 w-6 hover:text-gray-400" />
                    <span className="sr-only">{label}</span>
                </Link>
            ))}
        </div>
    </footer>
);

export default Footer;
