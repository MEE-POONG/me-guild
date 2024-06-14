import Layout from "@/components/layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React from "react"; 


export default function Home() {
  return (
    <Layout>
      <div className="">
        <HomeSlider />
        {/* ไส้ใส่สไลด์ */}
        <GuildRecomend />
        <ActivityUpdate />
        <NewsUpdate />
        <PoppularPerson/>
      </div>
    </Layout>
  );
}
