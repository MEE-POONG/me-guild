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
                <div className="w-full h-[450px] overflow-hidden">
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover "
                        alt=""
                    />
                </div>
                <div className=" container mx-auto mt-5 px-4">
                    <button className="bg-purple-400 hover:bg-purple-700 p-2 rounded text-gray-700 hover:text-gray-50 font-bold">
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