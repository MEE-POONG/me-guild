import Image from 'next/image';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    img: string;
}

const NewsCardHome: FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=6');
                const data = await response.json();
                setNewsData(data.news);
                setSelectedNews(data.news[0]); // Automatically select the first news item.
                setLoading(false);
            } catch (error) {
                console.error('Error fetching news:', error);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    const handleSelect = (item: NewsItem) => {
        setSelectedNews(item);
    };

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    return (
        <div className='container mx-auto mt-10 px-2 md:px-10 xl:px-0 my-12'>
            <p className="text-xl md:text-3xl flex items-end justify-between text-amber-400 border-b-4 border-gray-700 mb-2 uppercase">
                <span>
                    Latest
                    <span className="ml-3 text-white">News</span>
                </span>
                <Link href="/news" className="text-base text-amber-400 hover:text-amber-500">ทั้งหมด {`>>`}</Link>
            </p>
            <div className="md:flex bg-gray-800 text-white h-full">
                {/* Left Side (News Items List) */}
                <div className="md:w-1/3 space-y-1 max-h-[480px] overflow-y-auto">
                    {newsData.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center p-4 space-x-4 ${selectedNews?.id === item.id ? 'bg-amber-400 text-gray-800' : 'bg-gray-700'
                                } hover:bg-amber-400 cursor-pointer`}
                            onClick={() => handleSelect(item)}
                        >
                            <img
                                src={item.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${item.img}/wmd` : "/images/default.png"}
                                alt={item.title || 'item'}
                                className="rounded-md w-24"
                            />
                            <div className=''>
                                <h3 className="md:text-lg tracking-tighter line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs md:text-sm text-white line-clamp-1">
                                    {item.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-2 flex items-center">
                                    <span className="ml-2">{item.date}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedNews && (
                    <div className='md:w-2/3 space-y-1 max-h-[480px] overflow-y-auto'>
                        <div className="flex-1 p-5 md:p-9 bg-gray-50">
                            <img
                                src={selectedNews.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${selectedNews.img}/wmd` : "/images/default.png"}
                                alt={selectedNews.title}
                                className="rounded-md mb-4 w-full overflow-hidden object-cover"
                            />
                            <h3 className="md:text-lg font-bold text-gray-700">{selectedNews.title}</h3>
                            <p className="text-gray-700 mt-4 text-[14px] indent-5 text-justify">{selectedNews.description}</p>
                            <button className="mt-4 px-3 py-1 bg-yellow-400 rounded-md text-white text-xs">
                                News
                            </button>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default NewsCardHome;
