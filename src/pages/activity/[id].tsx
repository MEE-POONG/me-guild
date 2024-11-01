import Layout from '@/components/Layout';
import LatestMath from '@/containers/Activity/LatsetMath';
import LatestActivity from '@/containers/CardReccommend/LatestActivity';
import SearchBar from '@/containers/CardReccommend/SearchBarForm';
import WeAreSocial from '@/containers/CardReccommend/WeAreSocial';
import Image from 'next/image';
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

    const backgroundImageUrl = '/images/gameVS.jpg';

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
            <div
                className="bg-fixed h-[540px] w-full relative flex items-center justify-center"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="relative bg-black/70 h-full w-full flex items-center justify-center">
                    <h2 className="text-7xl font-bold text-white font-mg04">
                        Activity
                    </h2>
                </div>
            </div>
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
                        <div>
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
                                    <Link href={activities.dislink || '#'} className='ml-3 hover:text-purple-500'>
                                        {activities.disname || 'No Discord link provided'}
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <div className="flex items-center justify-center">
                                <div className="w-10 border-t-4 border-gray-400"></div>
                                <h2 className="mx-4 text-red-600 text-2xl font-bold whitespace-nowrap">
                                    LATEST <span className="text-white">MATCHES</span>
                                </h2>
                                <div className="flex-grow border-t-4 border-gray-400"></div>
                            </div>
                            <LatestMath />
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