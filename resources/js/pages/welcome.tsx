// resources/js/Pages/Welcome.tsx

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { Head } from '@inertiajs/react';

const Welcome: React.FC = () => {
    return (
        <>
            <Head title="Bienvenue sur Eventtia" />
            <div className="min-h-screen flex flex-col ">
                <Navbar />
                <main className="flex-grow">
                    <Hero />
                    <Features />
                    <Testimonials />
                    <CTA />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Welcome;
