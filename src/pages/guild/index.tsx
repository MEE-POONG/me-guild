import Layout from "@/components/Layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { GiDaemonSkull } from "react-icons/gi";

const GuildPage: React.FC = (props) => {
    const backgroundImageUrl = '/images/grandhall2.png';

    return (
        <Layout>
            <section className="">
                <div
                    className="bg-fixed h-[600px] w-full relative"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
                    <div className="relative z-10 bg-black/75 h-full">
                        <h2 className="text-4xl font-bold text-white    ">
                            Guild Hall
                        </h2>
                    </div>
                </div>
                <GuildList />

            </section>
        </Layout>
    )
}
export default GuildPage;