import Image from 'next/image';
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
                const response = await fetch('/api/news?page=1&pageSize=5');
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
        <div className='container mx-auto mt-10 px-2 md:px-10 xl:px-0'>
            <p className="text-xl md:text-3xl flex items-end justify-between text-amber-400 border-b-4 border-gray-700 mb-2 uppercase">
                <span>
                    Latest
                    <span className="ml-3 text-white">News</span>
                </span>
                {/* <Link href="/news" className="text-base text-amber-400 hover:text-amber-500">ทั้งหมด {`>>`}</Link> */}
            </p>
            <div className="md:flex bg-gray-800 text-white h-full">
                {/* Left Side (News Items List) */}
                <div className="md:w-1/3 space-y-1 max-h-[500px] overflow-y-auto">
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
                                width={80}
                                height={80}
                                className="rounded-md overflow-hidden"
                            />
                            <div className=''>
                                <h3 className="text-lg font-semibold tracking-tighter line-clamp-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white line-clamp-1">
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
                    <div className="flex-1 p-6 bg-gray-900">
                        <img
                            src={selectedNews.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${selectedNews.img}/wmd` : "/images/default.png"}
                            alt={selectedNews.title}
                            className="rounded-md mb-4 w-full h-64 overflow-hidden object-cover"
                        />
                        <h3 className="text-lg font-bold">{selectedNews.title}</h3>
                        <p className="text-gray-300 mt-4 text-sm">{selectedNews.description}</p>
                        <button className="mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white">
                            News
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default NewsCardHome;
