import Layout from "@/components/Layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";
import Link from "next/link";
import React from "react";


const TestPage: React.FC = (props) => {
  return (
    <Layout>
      <div className="neon">
        <span className="text" data-text="thanks">thanks</span>
        <span className="gradient"></span>
        <span className="spotlight"></span>
      </div>
    </Layout>
  );
}
export default TestPage;
