'use client';

import Navbar from '@/components/Navbar';
import Header from '@/components/Home/Header';
import SectionAvailableResources from '@/components/Home/SectionAvailableResources';
import Footer from '@/components/Footer';
import '@fontsource/ubuntu/400.css';

export default function Component() {
    return (
        <div key="1" className="flex flex-col min-h-screen" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
            <main className="flex-1">
                <Navbar />
                <Header />
                <SectionAvailableResources />
                <Footer />
            </main>
        </div>
    );
}
