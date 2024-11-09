import formatDate from '@/Function/formattedDate';
import axios from 'axios';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

interface NewsItem {
    id: string;
    title: string;
    img?: string;
    createdAt: string;
}

const LatestNews: FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('/api/news?page=1&pageSize=3');
                setNewsData(response.data.news || []);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p className="text-gray-200 text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/75 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-yellow-500">LATEST</span> NEWS
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className="bg-gray-700 p-3">
                {newsData.map(news => (
                    <div key={news.id} className="p-2">
                        <div className="flex items-center">
                            <Link href={`/news/${news.id}`}>
                                <img
                                    className="h-14 w-14 object-cover object-center rounded hover:scale-105 transition-transform duration-200"
                                    src={news.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/wmd` : "/images/default.png"}
                                    alt={news.title || 'news image'}
                                />
                            </Link>
                            <div className="ml-3">
                                <Link href={`/news/${news.id}`} className="text-gray-50 text-sm font-medium hover:text-yellow-500">
                                    {news.title}
                                </Link>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <FaCalendarAlt className="mr-1" />
                                    {formatDate(news.createdAt)}
                                </div>
                            </div>
                        </div>
                        <hr className="my-2 border-gray-600" />
                    </div>
                ))}
                <Link href="/news" className="flex justify-end text-xs text-gray-50 hover:text-purple-400 mt-3">
                    เพิ่มเติม
                </Link>
            </div>
        </div>
    );
};

export default LatestNews;
