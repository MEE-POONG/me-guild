import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NewsUpdate: React.FC = () => {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news?page=1&pageSize=9');
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
        <section className="container mx-auto px-2 md:px-10 xl:px-0 py-16">
            <div className="text-right border-b-4 border-gray-700">
                <Link href="/news" className="text-base text-white hover:text-amber-500">ทั้งหมด {`>>`}</Link>
            </div>
            <div className="flex flex-wrap mt-10">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    newsData.slice(5).map(news => (
                        <div key={news?.id} className="p-1 w-1/2 lg:w-1/4 drop-shadow-md">
                            <div className="h-full drop-shadow-lg border-2 bg-white rounded-md hover:border-t-ridge hover:border-l-groove hover:border-r-ridge hover:border-b-groove hover:border-[#f2b265]">

                                <div className="lg:h-48 md:h-36 w-full overflow-hidden inline-block box-border">
                                    <div className="tracking-widest text-xs font-medium text-white mb-1 p-1 w-12 bg-red-500 rounded-r absolute top-0 left-0 z-10 mt-2">
                                        NEWS
                                    </div>
                                    <img
                                        className="inner-img transition-transform duration-300 hover:scale-110 w-full h-full object-cover  z-20"
                                        src={news?.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/wmd` : "/images/default.png"}
                                        alt={news?.title || 'news'}
                                    />

                                </div>
                                <div className="p-3">

                                    <Link
                                        href={`/news/${news?.id}`}
                                        className="title-font text-sm md:text-lg font-medium mb-3 text-white hover:text-cyan-400 line-clamp-2"
                                    >
                                        {news?.title}
                                    </Link>

                                    <p className="text-xs font-extralight text-gray-700 mt-3 line-clamp-4">
                                        {news?.description}
                                    </p>
                                    <div className="mt-5">
                                        <Link href={`/news/${news?.id}`} className="text-white inline-flex items-center md:mb-2 lg:mb-0 text-sm bg-gray-800/50 p-2 rounded hover:bg-red-600">
                                            Read

                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default NewsUpdate;
