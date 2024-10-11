import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import { BiArrowFromRight } from 'react-icons/bi';
import NewsList from '@/containers/News/NewsList';
import HotNewsCard from '@/containers/News/HotNews';
import HotNewsTwoCard from '@/containers/News/HowNewsTwo';

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
            <div className="container mx-auto px-2 md:px-10 xl:px-0">
                <a href="/" className='text-gray-100 flex items-center gap-2 hover:underline decoration-sky-500'> <BiArrowFromRight /> Home</a>

                <p className="text-4xl font-bold flex items-end justify-between text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    <span>
                        News
                        <span className="text-xs bg-sky-400 px-1 rounded-md text-white font-light ml-1">Update</span>
                    </span>
                </p>
                <div className='lg:grid grid-cols-12 gap-10 mt-6'>
                    <div className='col-span-8'>
                        <HotNewsCard />
                        <HotNewsTwoCard />
                        <NewsList />
                    </div>
                    <div className='col-span-4 border'>
                        Card Activity
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default NewsPage;
