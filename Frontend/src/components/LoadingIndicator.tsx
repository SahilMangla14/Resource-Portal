import React from 'react';
import { SiGoogleearth, SiGooglecontaineroptimizedos } from "react-icons/si";
import { FaCircleRadiation } from "react-icons/fa6";
import '@fontsource/ubuntu/400.css';
import './LoadingIndicator.css';

const iconArray = [
    SiGoogleearth,
    SiGooglecontaineroptimizedos,
    FaCircleRadiation,
];

const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconArray.length);
    return iconArray[randomIndex];
};

const LoadingIndicator: React.FC = () => {
    const RandomIcon = getRandomIcon();

    return (
        <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}
        >
            <RandomIcon className="rotate-icon ml-9 mb-2" />
            <p className="text-black font-bold text-2xl font-mono">
                Loading...
            </p>
        </div>
    );
};

export default LoadingIndicator;
