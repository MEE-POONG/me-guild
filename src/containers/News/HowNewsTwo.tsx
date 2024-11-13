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

const HotNewsTwoCard: FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=4');
                const data = await response.json();
                setNewsData(data.news);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (!newsData.length) {
        return <div className="text-center text-white">No news available.</div>;
    }

    return (
        <div className="mt-6">
            {newsData.slice(2).map((item) => (
                <div
                    key={item.id}
                    className="text-white overflow-hidden border-b border-gray-500 md:flex mb-3 drop-shadow-md"
                >
                    <div className="relative h-48 md:w-1/3 overflow-hidden">
                        <Link href={`/news/${item.id}`}>

                            <img
                                src={item.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${item.img}/wmd` : "/images/default.png"}
                                alt={item.title || 'news'}
                                className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                            />

                        </Link>
                        <span className="absolute top-2 left-2 bg-red-500 text-white px-5 py-1 text-sm rounded">
                            {item.category || 'News'}
                        </span>
                    </div>
                    <div className="p-6 bg-black/20 md:flex-1">
                        <Link href={`/news/${item.id}`} className="text-lg font-bold mb-2 text-amber-300 hover:text-teal-500 block">

                            {item.title}

                        </Link>
                        <p className="text-gray-100 text-sm line-clamp-2 mt-2">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotNewsTwoCard;
