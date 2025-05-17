import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewActivityUpdate: React.FC = (props) => {
    const [activityData, setActivityData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get('/api/actDetail?page=1&pageSize=10');
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
                                    <li key={activities.id}  className="border-b border-slate-500 mb-2">
                                        <Link href={`/activity/${activities.id}`} className="flex justify-between ">
                                            {activities.title}
                                            <span className="text-orange-400">{activities.point} point</span>
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default NewActivityUpdate;