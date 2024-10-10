import Layout from "@/components/Layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsCard from "@/containers/Home/NewsCard";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React from "react";


const Home: React.FC = (props) => {
  return (
    <Layout>
      <section className="">
        <HomeSlider />
        <NewsCard />
        <NewsUpdate />
        <ActivityUpdate />
        {/* <GuildRecomend /> กิลด์แนะนำ */}
        {/* <PoppularPerson/> */}
      </section>
    </Layout>
  );
}
export default Home;
