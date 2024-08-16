import Layout from '@/components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState, useEffect } from 'react';

const ActivityDetail: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [activities, setActivities] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchNews = async () => {
                try {
                    const response = await fetch(`/api/actDetail/${id}`);
                    const data = await response.json();
                    setActivities(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching news:', error);
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!activities) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>News not found</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className='container mx-auto md:px-10 py-24'>
                {/* <Link href='/activity'>Back</Link> */}
                <div className='bg-gray-100 py-10 px-3 rounded shadow-inner text-center'>
                    <p className='text-xl font-black mb-10'>{activities.title}</p>
                    <p>ระยะเวลา : <span className='text-orange-400'> {activities.startdate} - {activities.enddate}</span></p>
                    <p>ประเภทการแข่งขัน : {activities.type}</p>

                    {/* ภาพประกอบ/โปรโมท */}
                    <img src={activities.img}
                        className='py-5 mx-auto drop-shadow-lg w-[620px] h-[400px]'
                        alt="" />
                    <div>
                        <p>รายละเอียดกิจกรรม</p>
                        <p className='text-purple-700'>Discord :
                            <a href="/ลิงค์ดิสก์" className='ml-3 hover:text-purple-900'>{activities.disname}</a>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ActivityDetail;