import { useEffect, useState } from 'react';
import Layout from "@/components/Layout";
import { BiArrowFromRight, BiSearch } from 'react-icons/bi';
import NewsList from '@/containers/News/NewsList';
import HotNewsCard from '@/containers/News/HotNews';
import HotNewsTwoCard from '@/containers/News/HowNewsTwo';
import WeAreSocial from '@/containers/CardReccommend/WeAreSocial';
import LatestActivity from '@/containers/CardReccommend/LatestActivity';
import SecondaryTopicOne from '@/components/Head/SecondaryTopicOne';
import SearchBar from '@/containers/CardReccommend/SearchBarForm';
import Breadcrumb from '@/components/Breadcrumb';
import ReccommentBlog from '@/containers/CardReccommend/ReccommentBlog';

const NewsPage: React.FC = (props) => {
    const [newsData, setNewsData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const backgroundImageUrl = '/images/grandhall2.png';

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
            <section>
                <SecondaryTopicOne title={`News Hall`} imgBg={backgroundImageUrl} />
                <Breadcrumb />
                <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                    <div className='lg:grid grid-cols-12 gap-10 mt-6'>
                        <div className='col-span-8'>
                            <HotNewsCard />
                            <HotNewsTwoCard />
                            <NewsList />
                        </div>
                        <div className='col-span-4'>
                            {/* search */}
                            <SearchBar/>
                            {/* Social */}
                            <WeAreSocial />
                            {/* Latest Activity */}
                            <LatestActivity />
                            {/* Latest Match */}
                            <ReccommentBlog/>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default NewsPage;
