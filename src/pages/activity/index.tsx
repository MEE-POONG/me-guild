import Layout from "@/components/Layout"
import { useEffect, useState } from "react";

const ActivityPage: React.FC = (props) => {

    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const backgroundImageUrl = '/images/grandhall2.png';

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch('/api/actDetail');
                const data = await response.json();
                setActivityData(data.activities);
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
                    className="bg-fixed h-[530px] w-full relative flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${backgroundImageUrl})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="relative bg-black/50 h-full w-full flex items-center justify-center">
                        <h2 className="text-7xl font-bold text-white font-mg04">
                            Guild Hall
                        </h2>
                    </div>
                </div>
                <h2 className="animate-cha02 font-bold">ประกาศกิจกรรม</h2>
                <hr />
                <div className="container mx-auto">
                    <div className="bg-[url('/images/blackboard01.jpg')] text-gray-100 p-5 md:p-16 mt-5 mb-20 shadow-xl shadow-indigo-600/50 rounded-lg">
                        <ul className="list-inside text-sm mt-8">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                activityData.map(activities => (
                                    <li key={activities.id} className="border-b border-slate-500 mb-2">
                                        <a href={`/activity/${activities.id}`} className="flex justify-between hover:text-cyan-500">
                                            {activities.title}
                                            <span className="text-orange-400">{activities.point} point</span>
                                        </a>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default ActivityPage;