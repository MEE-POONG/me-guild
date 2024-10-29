// src/components/TournamentSection.tsx
import React from 'react';
import Image from 'next/image';

const TournamentSection: React.FC = () => {

    return (
        <section className="py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">Valorant Tournament</h2>
                <p className="mt-4 text-center text-lg">
                    Participate in the most exciting Valorant tournaments and showcase your skills!
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Add the image paths as per the files you've uploaded */}
                    <Image src="/path-to-image/DALL·E-2024-10-06_02.27.49.webp" alt="Valorant 1" className="rounded-lg shadow-lg" />
                    <Image src="/path-to-image/DALL·E-2024-10-06_02.27.32.webp" alt="Valorant 2" className="rounded-lg shadow-lg" />
                    <Image src="/path-to-image/DALL·E-2024-10-06_02.25.37.webp" alt="Valorant 3" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
    );
};

export default TournamentSection;
