import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const LatestActivity: FC = () => {
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
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/75 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-yellow-500">LATEST</span> ACTIVITY
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className='bg-gray-700 p-3'>
                {activityData.map(activities => (
                    <div key={activities.id}>
                        <Link href={`/activity/${activities.id}`}
                            className='text-gray-100 text-sm hover:text-cyan-400'
                        >
                            {activities.title}
                        </Link>
                        <hr />
                    </div>
                ))}
                <Link href="/activity" className='flex justify-end text-xs text-gray-50 hover:text-purple-400 mt-5'>เพิ่มเติม</Link>
            </div>

        </div>
    );
};

export default LatestActivity;
