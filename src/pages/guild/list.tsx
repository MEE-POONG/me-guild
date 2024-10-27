import Breadcrumb from "@/components/Breadcrumb";
import SecondaryTopicOne from "@/components/Head/SecondaryTopicOne";
import Layout from "@/components/Layout";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import GuildList from "@/containers/Guild/GuildList";
import React from "react"
import { BiArrowFromRight } from "react-icons/bi";

const GuildListPage: React.FC = (props) => {
    const backgroundImageUrl = '/images/grandhall2.png';

    return (
        <Layout>
            <div className="pt-[140px]" />
            <Breadcrumb />
            <section className="">
                {/* <SecondaryTopicOne title={`Guild Hall`} imgBg={backgroundImageUrl} /> */}
                <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
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
export default GuildListPage;