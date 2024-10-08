import Layout from "@/components/Layout";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { GiDaemonSkull } from "react-icons/gi";

const GuildPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="">
                <div className="w-full overflow-hidden" >
                    <img src="/images/bg05.webp"
                        className="w-full h-full object-cover absolute"
                        alt=""
                    />
                </div>
                <GuildList />
                {/* <PeopleList /> */}
            </section>
        </Layout>
    )
}
export default GuildPage;