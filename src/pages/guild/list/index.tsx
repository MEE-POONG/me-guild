import Breadcrumb from "@/components/Breadcrumb";
import SecondaryTopicOne from "@/components/Head/SecondaryTopicOne";
import Layout from "@/components/Layout";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import GuildList from "@/containers/Guild/GuildList";
import React from "react"

const GuildListPage: React.FC = (props) => {

    return (
        <Layout>
            <div className="pt-[140px]" />
            <Breadcrumb />
            <section className="">
                {/* <SecondaryTopicOne title={`Guild Hall`} imgBg={backgroundImageUrl} /> */}
                <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                    <SearchBar />
                    <div className="lg:grid grid-cols-12 gap-10">
                        <div className="col-span-8">
                            <GuildList />
                        </div>
                        <div className='col-span-4'>
                            {/* search */}
                            {/* Social */}
                            {/* Latest News */}
                            <LatestNews title={`Guild News`} api={`/news/search?page=1&pageSize=3&keyCategory=guild`} />
                            {/* Latest Match */}
                            <WeAreSocial />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default GuildListPage;