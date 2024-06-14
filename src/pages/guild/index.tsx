import Layout from "@/components/layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"

const GuildPage: React.FC = () => {
    return (
        <Layout>
            <section className="">
                <div className="w-full h-[450px] overflow-hidden">
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover "
                        alt=""
                    />
                </div>
                <GuildList/>
                <PeopleList/>
            </section>
        </Layout>
    )
}
export default GuildPage;