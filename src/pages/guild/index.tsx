import Layout from "@/components/layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { GiDaemonSkull } from "react-icons/gi";

const GuildPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="">
                <div className="w-full h-[350px] md:h-[450px] overflow-hidden relative" >
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover absolute"
                        alt=""
                    />
                    <div className="w-full h-full bg-black/40 absolute">
                        <p className="text-white font-extrabold text-4xl top-1/2 absolute left-9 md:left-16">GUILD HALL</p>
                    </div>
                </div>
                <div className=" container mx-auto mt-5 px-4">
                    <button className="bg-teal-500 hover:bg-teal-600 p-2 rounded text-gray-700 hover:text-gray-200 font-bold">
                        <Link href="/createGuild" className="flex items-center gap-1 ">
                            <GiDaemonSkull />CREATE GUILE
                        </Link>
                    </button>
                </div>
                <GuildList />
                <PeopleList />
            </section>
        </Layout>
    )
}
export default GuildPage;