import Image from 'next/image';
import Link from 'next/link';
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

const HotNewsTwoCard: FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=4');
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
        <div className="mt-6">
            {newsData.slice(2).map((item) => (
                <div
                    key={item.id}
                    className="text-white overflow-hidden border-b border-gray-500 md:flex mb-3 drop-shadow-md"
                >
                    {/* Full Image */}
                    <div className="relative w-[420px] h-48 overflow-hidden inline-block box-border">
                        <Link href={`/news/${item.id}`} className=''>
                            <Image
                                src={item.fullImage ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${item.fullImage}/wmd` : "/images/default.png"}
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                            />
                        </Link>
                        <span className="absolute top-2 bg-red-500 text-white px-5 py-1 text-sm rounded">
                            News
                        </span>
                    </div>
                    <div className="p-6 bg-black/20 mb-2">
                        <Link href={`/news/${item.id}`} className="text-lg font-bold mb-2 text-amber-300 hover:text-teal-500">{item.title}</Link>
                        {/* <div className="flex items-center text-gray-400 text-sm mb-4">
                            <span className="mr-2">
                                <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 2l-2 2-8 8-4 4-2 2v4h4l2-2 8-8 2-2V2z"></path>
                                    <path d="M16 2l6 6"></path>
                                </svg>
                                {item.date}
                            </span>
                            <span className="ml-4">
                                <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"></path>
                                    <path d="M7 6v9"></path>
                                    <path d="M17 6v9"></path>
                                    <path d="M9 6h6"></path>
                                </svg>
                                {item.comments} comments
                            </span>
                        </div> */}
                        <p className="text-gray-100 text-sm md:text-base line-clamp-3 mt-2">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default HotNewsTwoCard;
