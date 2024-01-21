import { SchoolIcon, BuildingIcon } from "@/components/Icons";
import ResourceCard from "@/components/Home/ResourceCard";

const SectionAvailableResources = () => (
    <section className="w-full py-6 md:py-12 lg:py-16 bg-[#E6F0FF]">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3">
            <ResourceCard
                icon={<SchoolIcon className="h-12 w-12 text-gray-800" />}
                title="Academic Resources"
                description="Access course materials, research papers, and other academic resources."
            />
            <ResourceCard
                icon={<SchoolIcon className="h-12 w-12 text-gray-800" />}
                title="Placeholder Text"
                description="Coming soon..."
            />
            <ResourceCard
                icon={<BuildingIcon className="h-12 w-12 text-gray-800" />}
                title="Placeholder Text"
                description="Coming soon..."
            />
        </div>
    </section>
);

export default SectionAvailableResources;
