import Image from 'next/image';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    img: string;
    comments: number;
    fullImage: string;
    category: string;
}

const HotNewsCard: FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=1');
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

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className="">
            {newsData.map((item) => (
                <div
                    key={item.id}
                    className="text-white overflow-hidden border-b border-gray-500 drop-shadow-md"
                >
                    {/* Full Image */}
                    <div className="relative w-full h-64 img-wrapper overflow-hidden inline-block box-border">
                        <Link href={`/news/${item.id}`} className=''>
                            <img
                                src={item.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${item.img}/wmd` : "/images/default.png"}
                                alt={item.title || 'news'}
                                className="inner-img transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                            />
                        </Link>
                        <span className="absolute top-2 bg-red-500 text-white px-5 py-1 text-sm rounded">
                            News
                        </span>
                    </div>
                    <div className="p-6 bg-black/20 mb-2">
                        <Link href={`/news/${item.id}`} className="text-lg font-bold mb-2 text-amber-400 hover:text-teal-500">{item.title}</Link>

                        <p className="text-gray-100 text-sm md:text-base line-clamp-3 mt-2">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default HotNewsCard;
