import { useEffect, useState } from "react";

const ActivityUpdate: React.FC = () => {
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
        <section className="bg-gray-900 w-full mt-12">
            <div className="container mx-auto text-gray-100  py-16">
                <p className="textstyles flex justify-between">
                    Activity
                    <a href="/activity" className="text-sm">All {'>>'}</a>
                </p>
                <div className="mt-3">
                    <div className="p-5">
                        <p className="text-xl mb-3">Daily</p>
                        <ul className="list-inside text-sm mt-5">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                activityData.map(activities => (
                                    <li key={activities.id} className="border-b border-slate-500 mb-2">
                                        <a href={`/activity/${activities.id}`} className="flex justify-between">
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
        </section>
    )
}
export default ActivityUpdate;