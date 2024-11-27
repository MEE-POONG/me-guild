import Link from "next/link";
import { useEffect, useState } from "react";


interface NewsItem {
    id: number;
    title: string;
    description: string;
    img: string;
}

const NewsList: React.FC = () => {
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=11');
                const data = await response.json();
                setNewsData(data.news || []);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p className="text-center text-white">Loading...</p>;
    }

    if (!newsData.length) {
        return <p className="text-center text-white">No news available.</p>;
    }

    return (
        <section className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                {newsData.slice(5).map((item) => (
                    <div key={item.id} className="drop-shadow-md rounded-b-lg">
                        <div className="h-full drop-shadow-lg">
                            <Link href={`/news/${item.id}`} passHref
                                className="img-wrapper lg:h-48 md:h-36 w-full overflow-hidden inline-block box-border">
                                <img
                                    className="inner-img transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
                                    src={item.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${item.img}/wmd` : "/images/default.png"}
                                    alt={item.title || 'news'}
                                />
                            </Link>
                            <div className="">
                                <div className="tracking-widest text-xs font-medium text-white mb-2 w-12 bg-red-500 rounded-r pl-1">
                                    NEWS
                                </div>
                                <Link href={`/news/${item.id}`} passHref className="title-font text-sm md:text-md font-medium mb-3 text-amber-400 hover:text-teal-500 leading-3 block">
                                    {item.title}
                                </Link>
                                <p className="text-xs line-clamp-1 font-extralight text-gray-100 mt-3">
                                    {item.description}
                                </p>
                                <div className="mt-5">
                                    <Link href={`/news/${item.id}`} passHref
                                        className="text-white inline-flex items-center text-sm bg-gray-800/50 p-2 rounded hover:bg-red-600"
                                    >
                                        Read
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewsList;
