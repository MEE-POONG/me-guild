import Layout from "@/components/layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"

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
                    <Link href='/createGuild'>Createb Guild</Link>
                </div>
                <GuildList/>
                <PeopleList/>
            </section>
        </Layout>
    )
}
export default GuildPage;