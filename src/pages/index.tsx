import React from "react";
import TitleTopicOne from "@/components/Head/TitleTopicOne";
import Layout from "@/components/Layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import BlogCard from "@/containers/Home/BlogCard";
import NewsCardHome from "@/containers/Home/NewsCard";


const Home: React.FC = () => {
  return (
    <Layout>
      <section className="">
        <TitleTopicOne title="Welcome" detailOne="Join our world of fantasy and adventure!" detailTwo="" detailThree="" imgBg="/images/bg02.webp" textBtn="Join To Discord" />
        <NewsCardHome />
        <ActivityUpdate />
        <BlogCard />
      </section>
    </Layout>
  );
}
export default Home;
