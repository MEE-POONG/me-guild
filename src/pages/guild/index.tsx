import SecondaryTopicOne from "@/components/Head/SecondaryTopicOne";
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
                <SecondaryTopicOne title={`Guild Gall`} imgBg={backgroundImageUrl} />
                <GuildList />
            </section>
        </Layout>
    )
}
export default GuildPage;