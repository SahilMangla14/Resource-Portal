import { SchoolIcon, BuildingIcon } from "@/components/Icons";
import ResourceCard from "@/components/Home/ResourceCard";
import { GiNotebook } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa6";

const SectionAvailableResources = () => (
    <section className="w-full py-6 md:py-12 lg:py-16 bg-[#E6F0FF]">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3">
            <ResourceCard
                icon={<GiNotebook size={50} color="#04276a" />}
                title="Academic Resources"
                description="Access course materials, research papers, and other academic resources."
                href="/academics"
            />
            <ResourceCard
                icon={<FaQuestion size={50} color="#04276a" />}
                title="New Section"
                description="Coming soon..."
                href="#"
            />
            <ResourceCard
                icon={<FaQuestion size={50} color="#04276a" />}
                title="New Section"
                description="Coming soon..."
                href="#"
            />
        </div>
    </section>
);

export default SectionAvailableResources;
