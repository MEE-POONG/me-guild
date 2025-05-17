import Layout from "@/components/Layout"
import LatestMath from "@/containers/Activity/LatsetMath";
import LatestNews from "@/containers/CardReccommend/LatestNews";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowFromRight } from "react-icons/bi";
import NowPlaying from '../../containers/Activity/NowPlaying';
import axios from "axios";

const ActivityPage: React.FC = (props) => {

    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const backgroundImageUrl = '/images/gameVS.jpg';

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get('/api/actDetail');
                setActivityData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching activities:', error);
                setLoading(false);
            }
        };

        fetchActivity();
    }, []);


    return (
        <Layout>
            <section className="">
                <div
                    className="bg-fixed h-[620px] w-full relative flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="relative bg-black/70 h-full w-full flex items-center justify-center">
                        <h2 className="text-7xl font-bold text-white font-mg04">
                            Activity Hall
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto px-2 md:px-10 xl:px-0 py-10">
                    <Link href="/" className='text-gray-100 flex items-center gap-2 hover:underline decoration-sky-500'> <BiArrowFromRight /> Home</Link>

                    <p className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                        <span>
                            Activity
                            <span className="text-xs bg-sky-400 px-1 rounded-md text-white font-light ml-2">Update</span>
                        </span>
                    </p>
                    <div className="lg:grid grid-cols-12 gap-10 mt-6">
                        <div className="col-span-8">
                            <div>
                                <ul className="list-inside text-sm bg-black/55 p-5">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        activityData.map(activities => (
                                            <li key={activities.id} className="border-b border-slate-500 mb-2">
                                                <Link href={`/activity/${activities.id}`} className="flex justify-between text-white hover:text-cyan-500">
                                                    {activities.title}
                                                    <span className="text-orange-400">{activities.point} point</span>
                                                </Link>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            <div className="my-16">
                                <div className="flex items-center justify-center">
                                    <div className="w-10 border-t-4 border-gray-400"></div>
                                    <h2 className="mx-4 text-red-600 text-2xl font-bold whitespace-nowrap">
                                        LATEST <span className="text-white">MATCHES</span>
                                    </h2>
                                    <div className="flex-grow border-t-4 border-gray-400"></div>
                                </div>
                                <NowPlaying />
                                <LatestMath />
                            </div>

                        </div>
                        <div className='col-span-4'>
                            {/* search */}
                            <SearchBar />
                            {/* Social */}
                            <WeAreSocial />
                            {/* Latest News */}
                            <LatestNews title={`News`} api={`/news/search?page=1&pageSize=3&keyCategory=`} />
                            {/* Latest Match */}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default ActivityPage;