import { SchoolIcon, BuildingIcon } from "@/components/Icons";
import ResourceCard from "@/components/Home/ResourceCard";

const SectionAvailableResources = () => (
    <section className="w-full py-6 md:py-12 lg:py-16 bg-[#FAF6F0]">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3">
            <ResourceCard
                icon={<SchoolIcon className="h-12 w-12 text-[#3E3232]" />}
                title="Academic Resources"
                description="Access course materials, research papers, and other academic resources."
            />
            <ResourceCard
                icon={<SchoolIcon className="h-12 w-12 text-[#3E3232]" />}
                title="Student Services"
                description="Explore services and support available for students."
            />
            <ResourceCard
                icon={<BuildingIcon className="h-12 w-12 text-[#3E3232]" />}
                title="Campus Facilities"
                description="Discover the various facilities available on campus."
            />
        </div>
    </section>
);

export default SectionAvailableResources;
