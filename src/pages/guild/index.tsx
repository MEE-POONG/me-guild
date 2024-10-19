import SecondaryTopicOne from "@/components/Head/SecondaryTopicOne";
import Layout from "@/components/Layout";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import GuildList from "@/containers/Guild/GuildList";
import PeopleList from "@/containers/Guild/PeopleList";
import Link from "next/link";
import React from "react"
import { BiArrowFromRight } from "react-icons/bi";
import { GiDaemonSkull } from "react-icons/gi";

const GuildPage: React.FC = (props) => {
    const backgroundImageUrl = '/images/grandhall2.png';

    return (
        <Layout>
            <section className="">
                <SecondaryTopicOne title={`Guild Hall`} imgBg={backgroundImageUrl} />
                <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                    <a href="/" className='text-gray-100 flex items-center gap-2 hover:underline decoration-sky-500'> <BiArrowFromRight /> Home</a>

                    <h3 className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                        Goild
                    </h3>
                    <div className="lg:grid grid-cols-12 gap-10 mt-6">
                        <div className="col-span-8">
                            <GuildList />
                        </div>

                        <div className='col-span-4'>
                            {/* search */}
                            <SearchBar />
                            {/* Social */}
                            <WeAreSocial />
                            {/* Latest News */}
                            <LatestNews />
                            {/* Latest Match */}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default GuildPage;