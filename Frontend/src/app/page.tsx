'use client';

import Navbar from '@/components/Navbar';
import Header from '@/components/Home/Header';
import SectionAvailableResources from '@/components/Home/SectionAvailableResources';
import Footer from '@/components/Footer';
import '@fontsource/ubuntu/400.css';
import { useEffect, useState } from 'react';
import LoadingIndicator from '@/components/LoadingIndicator'

export default function Component() {
    const [isPageLoading, setIsPageLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsPageLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimeout);
    }, []);


    return (
        <div>
            {isPageLoading ? (
                <LoadingIndicator />
            ) : (
                <div key="1" className="flex flex-col min-h-screen" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                    <main className="flex-1">
                        <Navbar />
                        <Header />
                        <SectionAvailableResources />
                        <Footer />
                    </main>
                </div>
            )}
        </div>

    );
}
