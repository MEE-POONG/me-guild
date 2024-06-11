import Layout from "@/components/layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import PoppularPerson from "@/containers/Home/PopularPerson";
import HomeSlider from "@/containers/Home/Slider";


export default function HomeForLogin() {
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
