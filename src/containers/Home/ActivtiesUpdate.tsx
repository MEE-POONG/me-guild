import Link from "next/link";
import { useEffect, useState } from "react";

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
        <section className=" w-full md:my-12">
            <div className="container mx-auto text-gray-700 px-3">
                <p className="text-xl md:text-3xl flex items-end justify-between text-cyan-500 border-b-4 border-gray-500 pb-2 uppercase">
                    <span>
                        Latest
                        <span className="ml-3 text-white">Activity</span>
                    </span>
                </p>
                <div className="mt-3 bg-[url('/images/blackboard01.jpg')] shadow-xl">
                    <div className="p-10 md:p-32">
                        <p className="text-white text-2xl text-center">ประกาศกิจกรรม</p>
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
                        <div className="text-right">
                            <Link href="/activity" className="text-xs md:text-base text-teal-400 hover:text-teal-500 hover:underline">ทั้งหมด {`>>`}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ActivityUpdate;