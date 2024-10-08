import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";

const NewsPage: React.FC = (props) => {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
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
        <Layout>
            <div className="container mx-auto px-4 my-24">
                <p className="text-2xl font-bold flex items-end justify-between text-gray-100 border-b border-gray-400 pb-2">
                    <span>
                        News
                        <span className="text-xs bg-blue-400 px-1 rounded-md text-white font-light ml-1">Update</span>
                    </span>
                </p>
                <div className="flex flex-wrap mt-5">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        newsData.map(news => (
                            <div key={news.id} className="p-1 w-1/2 lg:w-1/3 ">
                                <div className="h-full border-2 border-gray-200 border-opacity-60 bg-white rounded overflow-hidden 
                                                drop-shadow-lg
                                                "
                                >
                                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={news.img} alt="news" />
                                    <div className="p-3">
                                        <p className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">NEWS</p>
                                        <h1 className="title-font text-sm md:text-lg font-medium text-gray-900 mb-3">{news.title}</h1>
                                        <p className="leading-relaxed mb-3 line-clamp-2 text-sm">{news.content}</p>
                                        <div className="">
                                            <a href={`/news/${news.id}`} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 text-sm">
                                                Read
                                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14"></path>
                                                    <path d="M12 5l7 7-7 7"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default NewsPage;
