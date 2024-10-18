import Layout from "@/components/Layout"
import LatestActivity from "@/containers/CardReccommend/LatestActivity";
import SearchBar from "@/containers/CardReccommend/SearchBarForm";
import WeAreSocial from "@/containers/CardReccommend/WeAreSocial";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiArrowFromRight, BiChevronRight } from "react-icons/bi";

const ReadNews: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [news, setNews] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchNews = async () => {
                try {
                    const response = await fetch(`/api/news/${id}`);
                    const data = await response.json();
                    setNews(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching news:', error);
                    setLoading(false);
                }
            };

            fetchNews();
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    if (!news) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-10">
                    <p>News not found</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-2 md:px-10 xl:px-0 py-3">
                <div className="flex items-center gap-2">
                    <Link href="/" className='text-gray-100 flex items-center gap-1 hover:underline decoration-sky-500'>
                        <BiArrowFromRight size={20} /> Home
                    </Link>
                    <Link href="/news" className='text-gray-100 flex items-center hover:underline decoration-sky-500'>
                        <BiChevronRight size={18} />News <BiChevronRight size={18} />
                    </Link>
                </div>

                <h3 className="text-4xl font-bold uppercase flex text-gray-100 border-teal-400 border-b-4 pb-2 mt-10">
                    {news.title}
                </h3>
                <div className="lg:grid grid-cols-12 gap-10 mt-6">
                    <div className="col-span-8">

                        <img src={news.img}
                            className="w-full h-[420px] mx-auto drop-shadow-md"
                            alt=""
                        />
                        <p className="mt-10 indent-8 text-gray-200">
                            {news.description}
                        </p>

                        <div className="mt-10">
                            <hr className="mb-3" />
                            อ่านเพิ่ม :
                            <a href={news.creditlink}
                                className="ml-3 text-teal-500 hover:text-teal-700" target="_blank">
                                {news.creditlink}
                            </a>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        {/* search */}
                        <SearchBar />

                        {/* Social */}
                        <WeAreSocial />
                        {/* Latest Activity */}
                        <LatestActivity />
                        {/* Latest Match */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default ReadNews;