import Layout from "@/components/layout"
import SliderActivity from "@/containers/Activity/SlideActivityNew";
import GameMatching from "./gameMatching";
import NewActivityUpdate from "@/containers/Activity/NewActivityUpdate";

const ActivityPage: React.FC = (props) => {
    return (
        <Layout>
            <section className="">
                <h2 className="text-gray-700 text-2xl font-bold text-center mb-5">Activity Mall</h2>
                <SliderActivity />
                {/* <div className="bg-white w-full h-[1px] container mx-auto my-12"></div> */}
                <div className="mt-10">
                    <NewActivityUpdate />
                    <GameMatching />
                </div>
            </section>
        </Layout>
    )
}
export default ActivityPage;