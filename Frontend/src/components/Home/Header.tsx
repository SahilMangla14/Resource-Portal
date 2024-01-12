import NucleusScene from "@/components/Home/NucleusScene";
import SearchBar from "@/components/SearchBar";

const Header = () => (
    <section className="w-full py-12 md:py-16 lg:py-28 xl:py-40 bg-[#F4EAE0]">
        <div className="container grid grid-cols-1 lg:grid-cols-2 px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4 text-left pl-10">
                <div className="space-y-2">
                    <h1 className="pt-20 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#3E3232]">
                        Welcome to the <br></br> University Resource Portal
                    </h1>
                    <p className="mx-auto max-w-[700px] text-[#503C3C] md:text-xl">
                        Your one-stop destination for every need
                    </p>
                </div>
                <div className="w-full max-w-md">
                    <SearchBar placeholder="Search resources..." />
                </div>
            </div>
            <div>
                <NucleusScene />
            </div>
        </div>
    </section>
);

export default Header;
