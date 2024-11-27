import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';

const NewsReccomend: FC = () => {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=3');
                const data = await response.json();
                setNewsData(data.news);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);


    return (
        <div className="mt-6">
            <div className="flex items-center bg-gray-900/75 pl-4 py-5">
                <h3 className="text-xl font-bold text-gray-100">
                    <span className="text-yellow-500">LATEST</span> NEWS
                </h3>
                <div className="flex-1 border-t-4 border-gray-100 ml-4"></div>
            </div>
            <div className='bg-stone-800 p-3'>
                {newsData.map(news => (
                    <div key={news.id} className="p-2">
                        <div className="flex">
                            <Link href={`/news/${news.id}`}>
                            src={news.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/wmd` : "/images/default.png"}
                            alt={news.title || 'news'}
                            </Link>
                            <div className="p-3">
                                <Link href={`/news/${news.id}`} className="text-gray-50 text-sm">
                                    {news.title}
                                </Link>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                <Link href="/activity" className='flex justify-end text-xs text-gray-50 hover:text-purple-400 mt-3'>เพิ่มเติม</Link>
            </div>

        </div>
    );
};

export default NewsReccomend;
