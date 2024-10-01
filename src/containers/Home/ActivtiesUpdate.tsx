import { useEffect, useState } from "react";

const ActivityUpdate: React.FC = () => {
    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await fetch('/api/actDetail?page=1&pageSize=5');
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
        <section className=" w-full md:mt-12">
            <div className="container mx-auto text-gray-700 py-16 px-4">
                {/* <p className="text-xl md:text-4xl font-bold flex items-end justify-between text-gray-700 border-b border-gray-400 pb-2">
                    <span>
                        Activity
                        <span className="text-xs bg-blue-400 px-1 rounded-md text-white font-light ml-1">Update</span>
                    </span>
                    <a href="/activity" className="text-base text-teal-600 hover:text-teal-500">ทั้งหมด {`>>`}</a>
                </p> */}
                <div className="mt-3 bg-[url('/images/blackboard01.jpg')] drop-shadow-xl">
                    <div className="p-10 md:p-36">
                        <p className="text-white text-2xl text-center">ประกาศกิจกรรม</p>
                        <ul className="list-inside text-xs md:text-base mt-7 ">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                activityData.map(activities => (
                                    <li key={activities.id} className="border-b border-slate-500 mb-5">
                                        <a href={`/activity/${activities.id}`} className="flex justify-between text-stone-50">
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