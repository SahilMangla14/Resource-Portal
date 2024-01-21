import Link from 'next/link';

function ResourceCard({ icon, title, description, href }) {
    return (
        <Link href={href} className=" bg-gradient-to-br from-cyan-200 to-blue-200  hover:bg-gradient-to-br hover:from-cyan-300 hover:to-blue-300 active:bg-gradient-to-br active:from-cyan-400 active:to-blue-400 flex flex-col items-center space-y-4 text-center rounded-md p-5 transform transition-transform hover:scale-90 transition-all duration-300 ease-in-out transform shadow-lg hover:shadow-lg">
            {icon}
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-500">{description}</p>
        </Link>
    );
}

export default ResourceCard;
