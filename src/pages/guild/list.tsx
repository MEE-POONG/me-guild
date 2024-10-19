import Layout from "@/components/Layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { GiDaemonSkull } from "react-icons/gi";

const GuildListPage: React.FC = (props) => {
    const backgroundImageUrl = '/images/grandhall2.png';

    return (
        <Layout>
            <section className="">
                {/* <div
                    className="bg-fixed h-[530px] w-full relative flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover', 
                    }}
                >
                    <div className="relative bg-black/50 h-full w-full flex items-center justify-center">
                        <h2 className="text-7xl font-bold text-white font-mg04">
                            Guild Hall
                        </h2>
                    </div>
                </div> */}
                <GuildList />
            </section>
        </Layout>
    )
}
export default GuildListPage;