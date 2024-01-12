function ResourceCard({ icon, title, description }) {
    return (
        <div className=" bg-[#FAF6F0] flex flex-col items-center space-y-4 text-center rounded-md p-5 transform transition-transform hover:scale-90 transition-all duration-300 ease-in-out transform hover:shadow-lg hover:bg-gray-50">
            {icon}
            <h2 className="text-2xl font-bold text-[#3E3232]">{title}</h2>
            <p className="text-gray-700">{description}</p>
        </div>
    );
}

export default ResourceCard;
