import Layout from "@/components/layout"
import { useEffect, useState } from "react";

const ActivityPage: React.FC = (props) => {

    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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
            <section className="container mx-auto px-3 py-24 textstyles">
                <h2 className="animate-cha02 font-bold">ประกาศกิจกรรม</h2>
                <hr />
                <div className="bg-gray-100 text-gray-900 p-5 md:p-16 mt-5 mb-20">
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
            </section>
        </Layout>
    )
}
export default ActivityPage;