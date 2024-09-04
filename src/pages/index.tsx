import Layout from "@/components/layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React from "react"; 


const Home: React.FC = (props) => {
  return (
    <Layout>
      <div className="">
        <HomeSlider />
        <GuildRecomend /> {/*กิลด์แนะนำ*/}
        <ActivityUpdate />
        <NewsUpdate />
        {/* <PoppularPerson/> */}
      </div>
    </Layout>
  );
}
export default Home;
