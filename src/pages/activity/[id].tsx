import Layout from '@/components/Layout';
import LatestActivity from '@/containers/CardReccommend/LatestActivity';
import SearchBar from '@/containers/CardReccommend/SearchBarForm';
import WeAreSocial from '@/containers/CardReccommend/WeAreSocial';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState, useEffect } from 'react';
import { BiArrowFromRight, BiChevronRight } from 'react-icons/bi';


const ActivityDetail: React.FC = (props) => {
    const CFIMG = 'https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/';
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
                    console.error('Error fetching activity details:', error);
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!activities) {
        return <p>No activity details found.</p>;
    }

    return (
        <Layout>
            <div className='container mx-auto px-2 md:px-10 xl:px-0 py-3'>
                <div className="flex items-center gap-2">
                    <Link href="/" className='text-gray-100 flex items-center gap-1 hover:underline decoration-sky-500'>
                        <BiArrowFromRight size={20} /> Home
                    </Link>
                    <Link href="/activity" className='text-gray-100 flex items-center hover:underline decoration-sky-500'>
                        <BiChevronRight size={18} /> Activity<BiChevronRight size={18} />
                    </Link>
                </div>

                <h3 className="text-4xl uppercase flex text-gray-100 border-orange-500 border-b-4 pb-2 mt-10">
                    {activities.title}
                </h3>
                <div className="lg:grid grid-cols-12 gap-10 mt-6">
                    <div className="col-span-8">
                        <p className='text-xs md:text-base text-gray-50'>
                            ระยะเวลา : <span className='text-orange-400'>{activities.startdate} - {activities.enddate}</span>
                        </p>
                        <p className='text-xs md:text-base text-gray-50'>
                            ประเภทการแข่งขัน : {activities.type}
                        </p>

                        {/* ภาพประกอบ/โปรโมท */}
                        <img
                            src={`${CFIMG}${activities.img}/wmd`}
                            className='py-5 mx-auto drop-shadow-lg w-[620px] h-[400px]'
                            alt={activities.title || 'Activity image'}
                        />
                        <div>
                            <p className='text-xs md:text-base'>รายละเอียดกิจกรรม</p>
                            <p className='text-purple-400'>
                                Discord:
                                <a href={activities.dislink || '#'} className='ml-3 hover:text-purple-500'>
                                    {activities.disname || 'No Discord link provided'}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        {/* search */}
                        <SearchBar />

                        {/* Social */}
                        <WeAreSocial />
                        {/* Latest Activity */}
                        <LatestActivity />
                        {/* Latest Match */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ActivityDetail;