import Layout from '@/components/Layout';
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
            <div className='container mx-auto py-3 md:px-10 md:py-24'>
                {/* <Link href='/activity'>Back</Link> */}
                <div className="bg-[url('/images/blackboard01.jpg')] drop-shadow-xl py-12 px-3 md:p-20 shadow-xl shadow-indigo-600/50 rounded-lg">
                    <div className="bg-[url('/images/paper1.jpg')] text-center p-6 md:p-16 relative rounded-lg ">
                        <div className="absolute top-2 -left-8 md:left-10 md:top-10 lg:top-2 ">
                            <img src="/images/Megaphone01.png" alt="" className="w-20 lg:w-36 translate-x-6" />
                        </div>
                        <p className='text-xl font-black mb-10'>{activities.title}</p>
                        <p className='text-xs md:text-base'>ระยะเวลา : <span className='text-orange-400'> {activities.startdate} - {activities.enddate}</span></p>
                        <p className='text-xs md:text-base'>ประเภทการแข่งขัน : {activities.type}</p>

                        {/* ภาพประกอบ/โปรโมท */}
                        <img src={activities.img}
                            className='py-5 mx-auto drop-shadow-lg w-[620px] h-[400px]'
                            alt="" />
                        <div>
                            <p className='text-xs md:text-base'>รายละเอียดกิจกรรม</p>
                            <p className='text-purple-700'>Discord :
                                <a href="/ลิงค์ดิสก์" className='ml-3 hover:text-purple-900'>{activities.disname}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ActivityDetail;