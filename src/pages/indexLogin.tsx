import Layout from "@/components/layout";
import ActivityUpdate from "@/containers/Home/ActivtiesUpdate";
import GuildRecomend from "@/containers/Home/GuildRecomend";
import NewsUpdate from "@/containers/Home/NewsUpdate";


export default function HomeForLogin() {
  return (
    <Layout>
      <div className="">
        {/* <SimpleSlider /> */}
        ไส้ใส่สไลด์
        <GuildRecomend />
        <ActivityUpdate />
        <NewsUpdate />
      </div>
    </Layout>
  );
}
