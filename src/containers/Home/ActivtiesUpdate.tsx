import Link from "next/link";
import { useEffect, useState } from "react";
import MatchToday from "./MatchToday";
import axios from "axios";

const ActivityUpdate: React.FC = () => {
    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`/api/actDetail?page=1&pageSize=6`);
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
        <section className="md:my-12">
            <div className="container mx-auto text-gray-700 px-2 md:px-10 xl:px-0">
                <p className="text-xl md:text-3xl flex items-end justify-between text-amber-400 border-b-4 border-gray-700 mb-2 uppercase">
                    <span>
                        Latest
                        <span className="ml-3 text-white">Activity</span>
                    </span>
                    <Link href="/activity" className="text-base text-amber-400 hover:text-amber-500">ทั้งหมด {`>>`}</Link>
                </p>
                <div className="lg:grid grid-cols-2 gap-10 mt-3">
                    <div className="bg-black/55 px-4 py-2">
                        <ul className="list-inside text-xs md:text-base mt-7 ">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                activityData.map(activities => (
                                    <li key={activities.id} className="border-b border-slate-500 mb-5">
                                        <Link href={`/activity/${activities.id}`} className="flex justify-between text-stone-50 hover:text-cyan-400">
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