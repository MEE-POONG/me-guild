import formatDate from '@/Function/formattedDate';
import axios from 'axios';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';

interface LatestNewsProps {
    title?: string;
    api?: string;
}

const LatestNews: FC<LatestNewsProps> = ({ title = "LATEST NEWS", api="/" }) => {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`/api${api}`);
                // const data = await response.json();
                console.log('API Response:', response); // Log the response to inspect structure
                setNewsData(response.data.newsUpdates || []); // Ensure data.news is an array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, [api]);
    useEffect(() => {
        console.log(newsData);
    }, [newsData]);
    return (
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/75 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-[#f2b265]">LATEST</span> {title}
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className='bg-gray-700 p-3'>
             {newsData && newsData.length > 0 ? (
                    newsData.map((news) => (
                        <div key={news.id} className="p-2">
                            <Link href={`/news/${news.id}`} >
                                <div className='w-full flex'>
                                    <img
                                        className="h-24 w-24 object-cover object-center hover:scale-105"
                                        // src={news.img || '/images/guild/CyberToothOne.webp'}
                                        src={'/images/guild/CyberToothOne.webp'}
                                        alt="news"
                                    />
                                    <div className="p-3 text-md ">
                                        <div className='text-white hover:text-[#f2b265]'>
                                            {news.title}
                                        </div>
                                        <div className='flex mt-1 text-[.9rem] text-gray-400'>
                                            <FaCalendarAlt className='mr-2' />{formatDate(news.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <hr />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-gray-50 text-sm">No news available.</p>
                )}
                <Link href="/activity" className='flex justify-end text-xs text-gray-50 hover:text-[#f2b265] mt-3'>เพิ่มเติม</Link>
            </div>
        </div>
    );
};

export default LatestNews;
