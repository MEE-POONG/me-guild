import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import { BiArrowFromRight } from 'react-icons/bi';

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
                <a href="/" className='text-gray-100 flex items-center gap-2 hover:underline decoration-sky-500'> <BiArrowFromRight/> Home</a>

                <p className="text-2xl font-bold flex items-end justify-between text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    <span>
                        News
                        <span className="text-xs bg-sky-400 px-1 rounded-md text-white font-light ml-1">Update</span>
                    </span>
                </p>
                <div className="flex flex-wrap mt-5">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        newsData.map(news => (
                            <div key={news.id} className="p-1 w-1/2 lg:w-1/4 ">
                                <div className="h-full drop-shadow-lg">
                                    <a href={`/news/${news.id}`}>
                                        <img className="lg:h-48 md:h-36 w-full object-cover object-center hover:scale-105" src={news.img} alt="news" />
                                    </a>
                                    <div className="p-3">
                                        <div
                                            className="tracking-widest text-xs font-medium text-white mb-1 p-1 w-12 bg-yellow-400 rounded-r"
                                        >
                                            NEWS
                                        </div>
                                        <a href={`/news/${news.id}`} className="title-font text-sm md:text-lg font-medium mb-3 text-white hover:text-teal-500 leading-3"
                                        >
                                            {news.title}
                                        </a>
                                        {/* <p className="leading-relaxed mb-3 line-clamp-2 text-sm">{news.content}</p> */}
                                        <p className="text-xs line-clamp-3 font-extralight text-gray-400 mt-3">{news.description}</p>
                                        <div className="mt-10">
                                            <a href={`/news/${news.id}`}
                                                className="text-white inline-flex items-center md:mb-2 lg:mb-0 text-sm bg-gray-900/50 p-2 rounded hover:bg-violet-600">
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
