import Image from 'next/image';
import { FC, useState, useEffect } from 'react';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
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
                    className="text-white overflow-hidden border-b border-gray-500"
                >
                    {/* Full Image */}
                    <div className="relative w-full h-64">
                        <a href={`/news/${item.id}`} className=''>
                            <Image
                                src={item.fullImage}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full hover:scale-105"
                            />
                        </a>
                        <span className="absolute top-2 left-2 bg-yellow-400 text-white px-5 py-1 text-sm rounded">
                            News
                        </span>
                    </div>
                    <div className="p-6">
                        <a href={`/news/${item.id}`} className="text-lg font-bold mb-2 hover:text-teal-500">{item.title}</a>

                        <p className="text-gray-300 text-sm md:text-base line-clamp-3 mt-2">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default HotNewsCard;
