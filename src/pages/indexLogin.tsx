import Layout from "@/components/layout";
import NewsUpdate from "@/containers/Home/NewsUpdate";
import SimpleSlider from "@/containers/Home/Slider";


export default function HomeForLogin() {
  return (
    <Layout>
      <div className="container mx-auto">

        <SimpleSlider />
        <NewsUpdate />

      </div>
    </Layout>
  );
}
