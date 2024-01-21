import NucleusScene from "@/components/Home/NucleusScene";
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
    const handleLinkClick = () => {
        window.scrollTo({
            top: document.body.scrollHeight - window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <section className="w-full py-12 md:py-16 lg:py-28 xl:py-[9.5rem] bg-[#E6F0FF]">
            <div className="container grid grid-cols-1 lg:grid-cols-2 px-4 md:px-6">
                <div className="flex flex-col items-start space-y-4 text-left pl-10">
                    <div className="space-y-2">
                        <h1 className="pt-20 text-[1.75rem] font-bold tracking-tighter text-transparent bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text">
                            Welcome to
                        </h1>
                        <h1 className="pl-3 text-8xl font-bold text-transparent bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text">
                            InfoNest
                        </h1>
                        <p className="pl-4 text-gray-600 md:text-xl" style={{ marginTop: '-5px' }}>
                            Your one-stop destination for every need
                        </p>
                    </div>
                    <Link
                        className={`text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-400 active:bg-gradient-to-br active:from-purple-600 active:to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-200  inline-flex items-center justify-center mt-10 ml-10 px-28 py-2 rounded-md shadow transform transition-transform ${styles.pulse}`}
                        href="#"
                        onClick={handleLinkClick}
                    >
                        Start Exploring
                    </Link>
                </div>
                <div>
                    <NucleusScene />
                </div>
            </div>
        </section>
    );
}

export default Header;
