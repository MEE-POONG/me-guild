import React from "react";
import TournamentSection from "@/containers/Event/TournamentSection";
import Layout from "@/components/Layout";
import Image from "next/image";

const EventPage: React.FC = () => {
    return (
        <Layout>
            <div className="event-page">
                <div className="relative h-screen flex items-center justify-center bg-black" style={{ height: 'calc(100vh - 6rem)' }}>
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src="/images/bg01.png"
                            alt="Fantasy Event"
                            className="object-cover w-full h-full opacity-60"
                        />
                    </div>

                    <div className="relative z-10 text-center">
                        <h1 className="text-5xl font-bold text-white">
                            Welcome to Me Guild
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            Join our world of fantasy and adventure!
                        </p>
                        <div className="mt-8">
                            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600">
                                Join Discord
                              
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <TournamentSection />
        </Layout>
    );
}

export default EventPage;
