import TitleTopicOne from "@/components/Head/TitleTopicOne";
import Layout from "@/components/Layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import BlogCard from "@/containers/Home/BlogCard";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsCardHome from "@/containers/Home/NewsCard";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React from "react";


const Home: React.FC = (props) => {
  return (
    <Layout>
      <section className="">
        <TitleTopicOne title="Welcome" detailOne="Join our world of fantasy and adventure!" detailTwo="" detailThree="" imgBg="/images/bg02.webp" textBtn="Join To Discord" />
        {/* <HomeSlider /> */}
        <NewsCardHome />
        <NewsUpdate />
        <ActivityUpdate />
        <BlogCard />
        {/* <GuildRecomend /> กิลด์แนะนำ */}
        {/* <PoppularPerson/> */}
      </section>
    </Layout>
  );
}
export default Home;
