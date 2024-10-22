import Link from "next/link";
import { useEffect, useState } from "react";
import MatchToday from "./MatchToday";

const ActivityUpdate: React.FC = () => {
    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch('/api/actDetail?page=1&pageSize=7');
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
        <section className="md:my-12">
            <div className="container mx-auto text-gray-700 px-2 md:px-10 xl:px-0">
                <p className="text-xl md:text-3xl flex items-end justify-between text-cyan-500 border-b-4 border-cyan-400 mb-2 uppercase">
                    <span>
                        Latest
                        <span className="ml-3 text-white">Activity</span>
                    </span>
                    <a href="/activity" className="text-base text-amber-400 hover:text-amber-500">ทั้งหมด {`>>`}</a>
                </p>
                <div className="lg:grid grid-cols-2 gap-10 mt-3">
                    <div className="bg-black/25 px-3">
                        <ul className="list-inside text-xs md:text-base mt-7 ">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                activityData.map(activities => (
                                    <li key={activities.id} className="border-b border-slate-500 mb-5">
                                        <Link href={`/activity/${activities.id}`} className="flex justify-between text-stone-50">
                                            {activities.title}
                                            <span className="text-orange-400">{activities.point} point</span>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <div className="mt-10 lg:mt-5">
                        <MatchToday />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ActivityUpdate;