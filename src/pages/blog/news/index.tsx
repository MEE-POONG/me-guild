import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import { BiArrowFromRight, BiSearch } from 'react-icons/bi';
import NewsList from '@/containers/News/NewsList';
import HotNewsCard from '@/containers/News/HotNews';
import HotNewsTwoCard from '@/containers/News/HowNewsTwo';
import WeAreSocial from '@/containers/CardReccommend/WeAreSocial';
import LatestActivity from '@/containers/CardReccommend/LatestActivity';

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



    //SearchBar
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add logic to handle the search query here
        console.log('Search query:', searchQuery);
    };


    return (
        <Layout>
            <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                <a href="/" className='text-gray-100 flex items-center gap-2 hover:underline decoration-sky-500'> <BiArrowFromRight /> Home</a>

                <p className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    <span>
                        News
                        <span className="text-xs bg-sky-400 px-1 rounded-md text-white font-light ml-2">Update</span>
                    </span>
                </p>
                <div className='lg:grid grid-cols-12 gap-10 mt-6'>
                    <div className='col-span-8'>
                        <HotNewsCard />
                        <HotNewsTwoCard />
                        <NewsList />
                    </div>
                    <div className='col-span-4'>
                        {/* search */}
                        <form onSubmit={handleSearch} className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type something..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 focus:outline-none text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 28 28"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 1 0-14 0 7 7 0 0 0 14 0z"
                                    />
                                </svg>
                            </button>
                        </form>

                        {/* Social */}
                        <WeAreSocial/>
                        {/* Latest Activity */}
                        <LatestActivity/>
                        {/* Latest Match */}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NewsPage;
