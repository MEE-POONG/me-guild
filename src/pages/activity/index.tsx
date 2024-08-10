import Layout from "@/components/layout"
import NewActivityUpdate from "@/containers/Activity/NewActivityUpdate";
import { useEffect, useState } from "react";

const ActivityPage: React.FC = (props) => {

    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch('/api/actDetail?page=1&pageSize=10');
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
            <section className="container mx-auto py-24">
                <h2 className="text-gray-500 text-2xl font-bold text-center mb-5">Activity Mall</h2>
                <div className="textstyles">
                    <div className="container mx-auto bg-gray-100 text-gray-900 p-16">
                        <h1 className="text-cyan-700 animate-cha02">
                            ประกาศกิจกรรม
                        </h1>
                        <div className="mt-3">
                            <div className="p-5">
                                <p className="text-xl mb-3">Daily</p>
                                <ul className="list-inside text-sm mt-5">
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        activityData.map(activities => (
                                            <li key={activities.id} className="border-b border-slate-500 mb-2">
                                                <a href={`/activity/${activities.id}`} className="flex justify-between ">
                                                    {activities.title}
                                                    <span className="text-orange-400">{activities.point} point</span>
                                                </a>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default ActivityPage;